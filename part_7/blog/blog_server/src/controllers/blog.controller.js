const blogControllerSetup = ({ db_service, constants, errors }) => ({
  getAllBlogs: async (_req, res) => res
    .json(await db_service.readAll(constants.dataToPopulate)),
  getBlog: async (req, res) => {
    const { id } = req.params;
    const blog = await db_service.readOne(id, constants.dataToPopulate);

    constants.isBlogDefined(blog, errors);

    res.json(blog);
  },
  postBlogs: async (req, res) => {
    const { title, author, url } = req.body;
    const { user: authorizedUser } = req;
    const {
      populateOptions, formattedData, findUser, CREATED,
    } = constants;

    constants.isDefinedData({ title, author, url }, errors);
    constants.isAuthorizedUser(authorizedUser.id, errors);

    const user = await findUser(authorizedUser.id);

    constants.isUserDefined(user, errors);

    const blog = await db_service.create(formattedData(req.body, authorizedUser), populateOptions);

    user.blogs = user.blogs.concat(blog._id);

    await user.save();

    res.status(CREATED).json(blog);
  },
  updateBlog: async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;

    constants.updatedDataTypeCheck(likes, errors);

    const blog = await db_service.update(id, { likes });

    constants.isBlogDefined(blog, errors);

    res.status(constants.OK).json(blog);
  },
  addComment: async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const oneBlog = await db_service.readOne(id);

    constants.isBlogDefined(oneBlog, errors);
    constants.validateComment(comment, oneBlog.comments, errors);

    const blog = await db_service.update(id, {
      comments: oneBlog.comments.concat(comment),
    });

    res.status(constants.OK).json(blog);
  },
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const userBlog = await db_service.Model.findById(id);

    constants.isBlogDefined(userBlog, errors);
    constants.isAuthorizedToDelete(userBlog.user, user.id, errors);

    await db_service.delete(id);

    res.status(constants.NO_CONTENT).end();
  },
});

export default blogControllerSetup;
