import assert from 'node:assert';
import {
  after, before, beforeEach, describe, it,
} from 'node:test';

import supertest from 'supertest';

import { disconnectMongoDB } from '../../db/connect.db.js';
import app from '../../server.js';
import { blogsAPIUtils } from '../../utils/index.js';
import beforeEachTest from '../index.js';

const api = supertest(app);

const { apiTestRequests, userListObjects, userAuth } = blogsAPIUtils;

beforeEach(async () => beforeEachTest('users'));

let apiRequests;

before(async () => {
  apiRequests = await apiTestRequests(api, '/api/auth');
});

describe('auth api login', () => {
  it('returns token with valid credentials', async () => {
    const { postData } = apiRequests;
    const { newUser } = userListObjects.USERS_TO_INSERT;

    await userAuth(newUser);

    const { body } = await postData(newUser, 200);

    assert(body.token);
    assert.strictEqual(body.username, newUser.username);
    assert(body.expiresIn);
  });

  it('fails with 401 for invalid username', async () => {
    const { postData } = apiRequests;
    const { nonExistentUser } = userListObjects.USERS_TO_INSERT;

    const { body } = await postData(nonExistentUser, 401);

    assert.strictEqual(body.error, 'Enter valid username');
  });

  it('fails with 401 for invalid password', async () => {
    const { postData } = apiRequests;
    const { hashTestUser } = userListObjects.USERS_TO_INSERT;

    await userAuth(hashTestUser);

    const { body } = await postData(
      {
        username: hashTestUser.username,
        password: 'wrongPassword',
      },
      401,
    );

    assert.strictEqual(body.error, 'Enter valid password');
  });

  it('fails with 400 for missing credentials', async () => {
    const { postData } = apiRequests;
    const { body } = await postData({}, 400);

    assert.strictEqual(body.error, 'Username and password are required');
  });

  it('token expires in one hour', async () => {
    const { postData } = apiRequests;
    const { hashTestUser } = userListObjects.USERS_TO_INSERT;

    await userAuth(hashTestUser);

    const { body } = await postData(hashTestUser, 200);

    assert.strictEqual(body.expiresIn, 3600);
  });
});

after(async () => disconnectMongoDB());

// the following script running this test: pnpm test:auth
