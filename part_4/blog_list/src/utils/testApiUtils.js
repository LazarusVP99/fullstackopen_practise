import * as bcrypt from 'bcrypt';

import User from '../models/users.model.js';

const saltRounds = 10;

const apiTestRequests = async (api, route) => ({
  getData: async () => api.get(route),
  postData: async (blog, status = 201, token = null) => api
    .post(route)
    .send(blog)
    .set('Authorization', `Bearer ${token}`)
    .expect(status)
    .expect('Content-Type', /application\/json/),
  updateData: async (id, likes, status = 200, token = null) => api
    .patch(`${route}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ likes })
    .expect(status)
    .expect('Content-Type', /application\/json/),
  deleteData: async (id, status = 204, token = null) => api
    .delete(`${route}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(status),
});

const userAuth = async (user) => User.create({
  ...user,
  password: await bcrypt.hash(user.password, saltRounds),
});

const blogListObjects = {
  INITIAL_BLOG_LIST: (userID) => [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: userID,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: userID,
    },
  ],
  BLOGS_TO_INSERT: {
    newBlog: (userID) => ({
      title: 'new blog title',
      author: 'test author',
      url: 'https://www.test.com',
      user: userID,
      likes: 10,
    }),
    newBlogWithoutLikes: (userID) => ({
      title: 'blog without likes',
      author: 'unknown author',
      user: userID,
      url: 'https://www.test.com',
    }),
    newBlogWithMissingProps: (userID) => ({
      author: 'unknown author',
      url: 'https://www.test.com',
      likes: 10,
      user: userID,
    }),
  },
};

const userListObjects = {
  invalidPasswords: [
    'short1A',
    'nouppercase1',
    'NOLOWERCASE1',
    'NoNumbers',
    'Test123!',
  ],
  INITIAL_USER_LIST: [
    {
      username: 'admin',
      name: 'Admin User',
      password: 'AdminPass123',
    },
    {
      username: 'root',
      name: 'Root User',
      password: 'RootPass123',
    },
  ],
  USERS_TO_INSERT: {
    newUser: {
      username: 'testUser1',
      name: 'Test User',
      password: 'TestPass123',
    },
    testUser: {
      username: 'testUser2',
      name: 'Test User',
    },
    hashTestUser: {
      username: 'hashTest345',
      name: 'Hash Test',
      password: 'HashTest123',
    },
    userWithNoProp: {
      name: 'Hash Test',
      password: 'TestPass123',
    },
    nonExistentUser: {
      username: 'nonexistent',
      password: 'Password123',
    },
  },
};

export default {
  blogListObjects,
  userListObjects,
  apiTestRequests,
  userAuth,
};
