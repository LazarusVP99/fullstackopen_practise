import 'dotenv/config.js';

const {
  PORT, MONGODB_URI, TEST_MONGODB_URI, NODE_ENV, SECRET,
} = process.env;

const MONGODB_URI_TO_USE = NODE_ENV && NODE_ENV === 'test'
  ? TEST_MONGODB_URI : MONGODB_URI;

export default {
  PORT, MONGODB_URI_TO_USE, TEST_MONGODB_URI, SECRET,
};
