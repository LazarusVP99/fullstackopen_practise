import User from '../models/users.model.js';

const blogControllerSetup = ({ db_service, errors }) => ({
  getAllBlogs: async (_req, res) => {
    const dataToPopulate = {
      path: 'user',
      select: 'username name id',
    };
    const blogs = await db_service.readAll(dataToPopulate);

    res.json(blogs);
  },
  postBlogs: async (req, res) => {
    const { title, author, url } = req.body;
    const { user: authorizedUser } = req;

    if (!title || !url) throw errors.ValidationError('title and url are required');
    if (!authorizedUser.id) throw errors.UnauthorizedError('invalid token or unauthorized');

    const user = await User.findById(authorizedUser.id);

    if (!user) throw errors.NotFoundError('user not found');

    const blog = await db_service.create({
      title,
      author,
      url,
      user: user._id,
    }, {
      path: 'user',
      select: 'username name id',
    });

    user.blogs = user.blogs.concat(blog._id);

    await user.save();

    res.status(201).json(blog);
  },
  updateBlog: async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;

    if (!likes || typeof likes !== 'number') throw errors.ValidationError('likes must be of type number');

    const blog = await db_service.update(id, { likes });

    if (!blog) throw errors.NotFoundError('blog not found');

    res.status(200).json(blog);
  },
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const userBlog = await db_service.Model.findById(id);
    console.log(userBlog);

    if (!userBlog) throw errors.NotFoundError('blog not found');

    if (userBlog.user.toString() !== user.id) throw errors.UnauthorizedError('Not authorized to delete this blog');

    const blog = await db_service.delete(id);

    if (!blog) throw errors.NotFoundError('blog not found');

    res.status(204).end();
  },
});

export default blogControllerSetup;
