import { Schema } from 'mongoose';

export const userModelEntity = {
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
};

export const blogModelEntity = {
  title: {
    type: String,
    required: [true, 'Title is required'],
    min: [3, 'Title must be at least 3 characters long'],
    max: [50, 'Title must be less than 50 characters long'],
    unique: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    min: [2, 'Author must be at least 2 characters long'],
    max: [30, 'Author must be less than 30 characters long'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url),
      message: 'Please enter a valid URL',
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
    default: [],
    minlength: [1, "Comment must be at least 1 character long"],
    maxlength: [200, "Comment must be less than 200 characters long"],
  },
};
