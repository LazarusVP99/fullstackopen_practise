import { Router } from 'express';

import blogControllerSetup from '../controllers/blog.controller.js';
import blogConstants from '../service/constants/blog.constants.js';
import { ApiError } from '../middleware/error.middleware.js';
import tokenMiddleware from '../middleware/token.middleware.js';
import Blog from '../models/blog.model.js';
import ModelsService from '../service/DB_crud.service.js';

const blogRouter = Router();

const blogService = new ModelsService(Blog);

const blogController = blogControllerSetup({
  db_service: blogService,
  constants: blogConstants,
  errors: ApiError,
});

blogRouter
  .get('/', blogController.getAllBlogs)
  .post('/', tokenMiddleware.userExtractor, blogController.postBlogs);

blogRouter
  .post("/:id/comments", blogController.addComment)
  .get("/:id", blogController.getBlog)
  .patch('/:id', blogController.updateBlog)
  .delete('/:id', tokenMiddleware.userExtractor, blogController.deleteBlog);

export default blogRouter;
