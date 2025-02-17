import User from '../../models/users.model.js';

const blogConstants = {
  dataToPopulate: {
    path: 'user',
    select: 'username name id',
  },
  findUser: async (id) => User.findById(id),
  isDefinedData: (credentials, errors) => {
    if (!credentials.title || !credentials.url) {
      throw errors.ValidationError('title and url are required');
    }
  },
  isAuthorizedUser: (id, errors) => {
    if (!id) throw errors.UnauthorizedError('invalid token or unauthorized');
  },
  validateComment: (comment, comments, errors) => {
    if (!comment.trim()) throw errors.ValidationError("comment is required");
    if (comments.some(commentData => commentData === comment)) {
      throw errors.ValidationError('comment must be unique');
    }
  },
  isUserDefined: (user, errors) => {
    if (!user) throw errors.NotFoundError('user not found');
  },
  isBlogDefined: (blog, errors) => {
    if (!blog) throw errors.NotFoundError('blog not found');
  },
  updatedDataTypeCheck: (likes, errors) => {
    if (!likes || typeof likes !== 'number') {
      throw errors.ValidationError('likes must be of type number');
    }
  },
  isAuthorizedToDelete: (blogUserId, userId, errors) => {
    if (blogUserId.toString() !== userId) {
      throw errors.UnauthorizedError('not authorized to delete this blog');
    }
  },
  formattedData: (data, authorizedUser) => ({
    title: data.title,
    author: data.author,
    url: data.url,
    user: authorizedUser.id,
  }),
  populateOptions: {
    path: 'user',
    select: 'username name id',
  },

  CREATED: 201,
  OK: 200,
  NO_CONTENT: 204,
};
export default blogConstants;
