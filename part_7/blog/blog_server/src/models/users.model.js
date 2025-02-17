import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { config } from '../utils/index.js';

import { userModelEntity } from './entity.js';

const userSchema = new Schema(userModelEntity);

userSchema.pre(
  'save',
  async function hashPassword(next) {
    const saltRounds = await genSalt(10);
    if (this.isModified('password') && process.env.NODE_ENV !== 'test') {
      this.password = hash(this.password, saltRounds);
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

userSchema.methods.generateToken = function generateToken(options = {}) {
  const { username, id, name } = this;
  const { expiresIn = '1h', includeUserDetails = false } = options;

  const payload = {
    username,
    id,
    ...(includeUserDetails && { name }),
  };

  return jwt.sign(payload, config.SECRET, { expiresIn });
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
