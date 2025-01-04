import { Schema, model } from 'mongoose';
import { blogModelEntity } from './entity.js';

const blogSchema = new Schema(blogModelEntity);

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model('Blog', blogSchema);
