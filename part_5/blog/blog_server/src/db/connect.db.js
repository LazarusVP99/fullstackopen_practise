import mongoose from 'mongoose';

import { config, logger } from '../utils/index.js';

const { info, errors } = logger;
const { MONGODB_URI_TO_USE } = config;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI_TO_USE);

    mongoose.connection.on('connected', () => {
      info('Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      errors('MongoDB connection error:', error);
      process.exit(1);
    });
  } catch (error) {
    errors('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const disconnectMongoDB = async () => {
  try {
    await mongoose.connection.close();
    info('MongoDB disconnected');
  } catch (error) {
    errors('Error disconnecting from MongoDB:', error.message);
  }
};

export { connectMongoDB, disconnectMongoDB };
