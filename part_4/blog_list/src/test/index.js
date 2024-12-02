import mongoose from 'mongoose';

import { connectMongoDB } from '../db/connect.db.js';
import Blog from '../models/blog.model.js';
import User from '../models/users.model.js';
import { blogsAPIUtils, logger } from '../utils/index.js';

const { blogListObjects, userListObjects } = blogsAPIUtils;

// Configuration object pattern for test setup
const testSetupConfig = {
  blogs: {
    model: Blog,
    initialData: (userId) => blogListObjects.INITIAL_BLOG_LIST(userId),
    entityName: 'blogs',
    dataToPopulate: {
      path: 'user',
      select: 'username name id',
    },
  },
  users: {
    model: User,
    initialData: userListObjects.INITIAL_USER_LIST,
    entityName: 'users',
    dataToPopulate: {
      path: 'blogs',
      select: 'url title author id',
    },
  },
};

const beforeEachTest = async (apiName, userId = null) => {
  mongoose.connection.setMaxListeners(30);
  await connectMongoDB();

  const config = testSetupConfig[apiName];
  if (!config) return;

  await config.model.deleteMany({});
  logger.info(`${config.entityName} cleared`);

  // Insert initial data for function objects if they exist
  const dataToInsert = typeof config.initialData === 'function'
    ? config.initialData(userId)
    : config.initialData;

  // Seed data into the database
  const seededData = await config.model.insertMany(dataToInsert);

  // Conditional user-blog relationship update
  if (apiName === 'blogs' && userId) {
    await User.findByIdAndUpdate(userId, {
      $push: { blogs: { $each: seededData.map((blog) => blog._id) } },
    });
  }

  logger.info(`${config.entityName} seeded`);
};

export default beforeEachTest;
