import assert from 'node:assert';
import {
  after, beforeEach, describe, it,
} from 'node:test';

import supertest from 'supertest';

import { disconnectMongoDB } from '../../db/connect.db.js';
import app from '../../server.js';
import { blogsAPIUtils } from '../../utils/index.js';
import beforeEachTest from '../index.js';

const api = supertest(app);

const {
  blogListObjects, userListObjects, apiTestRequests, userAuth,
} = blogsAPIUtils;
const { INITIAL_BLOG_LIST, BLOGS_TO_INSERT } = blogListObjects;

let testUser;
let authToken;

let apiRequests;
let authRequests;

beforeEach(async () => {
  await beforeEachTest('users');

  const { hashTestUser } = userListObjects.USERS_TO_INSERT;

  testUser = await userAuth(hashTestUser);
  apiRequests = await apiTestRequests(api, '/api/blogs');
  authRequests = await apiTestRequests(api, '/api/auth');

  const { body: authResponse } = await authRequests.postData(
    {
      username: testUser.username,
      password: hashTestUser.password,
    },
    200,
  );

  authToken = authResponse.token;

  await beforeEachTest('blogs', testUser._id);
});

describe('blogs api includes documents', () => {
  it('GET request to /api/blogs returns the correct amount of blog posts', async () => {
    const { body } = await apiRequests.getData();

    assert.strictEqual(body.length, INITIAL_BLOG_LIST(testUser._id).length);
  });

  it('GET request to /api/blogs returns the correct blog id', async () => {
    const { body } = await apiRequests.getData();
    const isIdAsKey = body.map((obj) => Object.keys(obj))[0];

    assert(isIdAsKey.includes('id'));
  });
  it('GET request includes user that owns the blog', async () => {
    const { body } = await apiRequests.getData();
    const isUserInfo = body.map((obj) => Object.keys(obj))[0];

    assert(isUserInfo.includes('user'));
  });
});

describe('blogs api inserting documents', () => {
  const { newBlog, newBlogWithMissingProps } = BLOGS_TO_INSERT;
  const { hashTestUser, newUser } = userListObjects.USERS_TO_INSERT;

  it('POST request without title or url returns 400 Bad Request', async () => {
    const { postData, getData } = apiRequests;
    const blogWithMissingProps = newBlogWithMissingProps(testUser._id);

    const postResponse = await postData(blogWithMissingProps, 400, authToken);

    const { body } = await getData();

    assert.strictEqual(postResponse.body.error, 'title and url are required');
    assert.strictEqual(body.length, INITIAL_BLOG_LIST(testUser._id).length);
  });

  it('POST request without authorization token returns 401 Unauthorized', async () => apiRequests.postData(newBlog(testUser._id), 401));

  it('POST request with valid token creates a new blog post', async () => {
    const { postData, getData } = apiRequests;

    await postData(newBlog(testUser._id), 201, authToken);

    const { body } = await getData();
    const titles = body.map(({ title }) => title);

    assert.strictEqual(
      body.length,
      INITIAL_BLOG_LIST(hashTestUser._id).length + 1,
    );
    assert(titles.includes('new blog title'));
  });

  it('POST request accessing another user\'s blog returns 401 Unauthorized', async () => {
    const { postData, getData } = apiRequests;

    const { body: invalidToken } = await authRequests.postData(
      {
        username: newUser.username,
        password: newUser.password,
      },
      401,
    );

    await postData(newBlog(testUser._id), 401, invalidToken.token);

    const { body } = await getData();

    assert.strictEqual(invalidToken.error, 'Enter valid username');
    assert.strictEqual(body.length, INITIAL_BLOG_LIST(hashTestUser._id).length);
    assert(!body.some(({ user }) => user.username === newUser.username));
  });
});

describe('blogs api updating document', () => {
  it('PATCH request to /api/blogs/:id with invalid likes type returns 400 Bad Request', async () => {
    const { updateData, getData } = apiRequests;
    const { body: initialBlogs } = await getData();
    const blogToUpdate = initialBlogs[0];

    await updateData(blogToUpdate.id, '10', 400);

    const { body: updatedBlogs } = await getData();
    const updatedBlog = updatedBlogs.find(({ id }) => id === blogToUpdate.id);
    const userLikes = INITIAL_BLOG_LIST(testUser._id);

    assert.strictEqual(updatedBlog.likes, userLikes[0].likes);
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes);
    assert(typeof updatedBlog.likes === 'number');
  });

  it('PATCH request to /api/blogs/:id with valid likes updates the blog', async () => {
    const { updateData, getData } = apiRequests;
    const { body: initialBlogs } = await getData();
    const blogToUpdate = initialBlogs[0].id;
    const likes = 25;

    await updateData(blogToUpdate, likes);

    const { body: updatedBlogs } = await getData();

    assert.strictEqual(updatedBlogs[0].likes, likes);
    assert.notStrictEqual(updatedBlogs[0].likes, initialBlogs[0].likes);
  });

  it('PATCH request to non-existent blog id returns 404 Not Found', async () => {
    const { updateData } = apiRequests;
    const nonExistentId = '507f1f77bcf86cd799439011';
    await updateData(nonExistentId, 10, 404);
  });
});

describe('blogs api deleting document', () => {
  const { newUser } = userListObjects.USERS_TO_INSERT;
  it('DELETE request to another user\'s blog returns 401 Unauthorized', async () => {
    const { deleteData, getData } = apiRequests;

    const { body: invalidToken } = await authRequests.postData(
      {
        username: newUser.username,
        password: newUser.password,
      },
      401,
    );

    const { body: initialBlogs } = await getData();

    const { body } = await deleteData(
      initialBlogs[0].id,
      401,
      invalidToken.token,
    );

    assert.strictEqual(body.error, 'invalid token or unauthorized');
    assert.strictEqual(invalidToken.error, 'Enter valid username');
  });

  it('DELETE request without authorization returns 401 Unauthorized', async () => {
    const { deleteData, getData } = apiRequests;
    const { body: initialBlogs } = await getData();

    const { body } = await deleteData(initialBlogs[0].id, 401);

    assert.strictEqual(body.error, 'invalid token or unauthorized');
  });

  it('DELETE request with proper authorization deletes the blog', async () => {
    const { deleteData, getData } = apiRequests;

    const { body: initialBlogs } = await getData();
    const blogToDelete = initialBlogs[0];

    await deleteData(blogToDelete.id, 204, authToken);

    const { body: updatedBlogs } = await getData();
    assert.strictEqual(updatedBlogs.length, initialBlogs.length - 1);
    assert(!updatedBlogs.some((blog) => blog.id === blogToDelete.id));
  });

  it('DELETE request to non-existent blog returns 401 Unauthorized', async () => {
    const nonExistentBlogId = '507f1f77bcf86cd799439011';
    await apiRequests.deleteData(nonExistentBlogId, 401, authToken);
  });
});

after(async () => disconnectMongoDB());

// estimated time for testing: 20-25 seconds
// extension used for testing: node:test runner

// the following script running this test: pnpm test:blogs
