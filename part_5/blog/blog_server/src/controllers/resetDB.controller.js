import Blog from '../models/blog.model.js';
import User from '../models/users.model.js';

const resetDBControllerSetup = {
  resetDB: async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    res.status(204).end();
  },
};

export default resetDBControllerSetup;
