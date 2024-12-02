import { Schema, model } from 'mongoose';

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

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model('User', userSchema);
