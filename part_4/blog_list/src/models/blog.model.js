import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
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
});

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model('Blog', blogSchema);
