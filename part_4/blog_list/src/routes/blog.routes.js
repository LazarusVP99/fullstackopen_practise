import { Router } from 'express';

import blogControllerSetup from '../controllers/blog.controller.js';
import { ApiError } from '../middleware/error.middleware.js';
import tokenMiddleware from '../middleware/token.middleware.js';
import Blog from '../models/blog.model.js';
import ModelsService from '../service/DB_crud.service.js';

const blogRouter = Router();

const blogService = new ModelsService(Blog);

const blogController = blogControllerSetup({
  db_service: blogService,
  errors: ApiError,
});

blogRouter
  .get('/', blogController.getAllBlogs)
  .post('/', tokenMiddleware.userExtractor, blogController.postBlogs);

blogRouter
  .patch('/:id', blogController.updateBlog)
  .delete('/:id', tokenMiddleware.userExtractor, blogController.deleteBlog);

export default blogRouter;
