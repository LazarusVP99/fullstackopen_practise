import bcrypt from 'bcrypt';
import assert from 'node:assert';
import {
  after, before, beforeEach, describe, it,
} from 'node:test';
import supertest from 'supertest';

import { disconnectMongoDB } from '../../db/connect.db.js';
import User from '../../models/users.model.js';
import app from '../../index.js';
import { blogsAPIUtils } from '../../utils/index.js';
import beforeEachTest from '../index.js';

const api = supertest(app);

const { apiTestRequests, userListObjects } = blogsAPIUtils;
const { invalidPasswords, USERS_TO_INSERT } = userListObjects;

let apiRequests;

before(async () => {
  apiRequests = await apiTestRequests(api, '/api/users');
});

describe('users api getting users', () => {
  it('returns all users with 200 status code', async () => {
    await beforeEachTest('users');
    const response = await apiRequests.getData();

    assert(Array.isArray(response.body));
  });

  it('returns users with correct properties', async () => {
    await beforeEachTest('users');
    const response = await apiRequests.getData();
    const user = response.body[0];

    assert(Object.prototype.hasOwnProperty.call(user, 'username'));
    assert(Object.prototype.hasOwnProperty.call(user, 'name'));
    assert(!Object.prototype.hasOwnProperty.call(user, 'password'));
  });
  it('returns empty array when no users exist', async () => {
    await User.deleteMany({});

    const response = await apiRequests.getData();

    assert.strictEqual(response.body.length, 0);
  });
});

describe('users api creating new user', () => {
  beforeEach(async () => {
    /* this is required step to ensure that the database
     is empty before each test is running in parallel with blog api tests */
    await User.deleteMany({});

    beforeEachTest('users');
  });
  it('creates a new user with valid data', async () => {
    const { postData } = apiRequests;

    await postData(USERS_TO_INSERT.newUser);
  });

  it('fails with status 400 if password does not meet requirements', async () => {
    const { postData } = apiRequests;

    await Promise.all(invalidPasswords.map(async (password) => {
      const newUser = {
        ...USERS_TO_INSERT.testUser,
        password,
      };

      const { body } = await postData(newUser, 400);

      assert.strictEqual(
        body.error,
        'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number',
      );
    }));
  });

  it('creates user with hashed password', async () => {
    const { postData } = apiRequests;
    const { password, username } = USERS_TO_INSERT.hashTestUser;

    await postData(USERS_TO_INSERT.hashTestUser);

    const savedUser = await User.findOne({ username });
    const passwordMatch = await bcrypt.compare(password, savedUser.password);

    assert(passwordMatch);
  });

  it('status 400 if required properties like does not exist', async () => {
    const { postData } = apiRequests;

    await postData(USERS_TO_INSERT.userWithNoProp, 400);
  });
});

after(async () => disconnectMongoDB());

// the following script running this test: pnpm test:users
