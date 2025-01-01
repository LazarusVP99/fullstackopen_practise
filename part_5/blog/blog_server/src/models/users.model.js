import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { config } from '../utils/index.js';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username must be less than 50 characters long'],
    unique: true,
  },
  name: {
    type: String,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [30, 'Name must be less than 30 characters long'],
  },
  blogs: {
    type: [Schema.Types.ObjectId],
    ref: 'Blog',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [3, 'Password must be at least 3 characters long'],
  },
});

userSchema.pre(
  'save',
  async function hashPassword(next) {
    const saltRounds = await genSalt(10);
    if (this.isModified('password') && process.env.NODE_ENV !== 'test') {
      this.password = await hash(this.password, saltRounds);
    }
    next();
  },
);

userSchema.methods.comparePassword = async function comparePassword(password) {
  if (process.env.NODE_ENV === 'test') {
    return password === this.password;
  }
  return compare(password, this.password);
};

userSchema.methods.userToken = function userToken() {
  const { username, id } = this;
  return jwt.sign(
    {
      username,
      id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    config.SECRET,
  );
};

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model('User', userSchema);
