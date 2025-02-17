import { Router } from 'express';

import usersControllerSetup from '../controllers/users.controller.js';
import { ApiError } from '../middleware/error.middleware.js';
import User from '../models/users.model.js';
import userConstants from '../service/constants/users.constants.js';
import ModelsService from '../service/db_crud.service.js';

const usersRouter = Router();

const usersService = new ModelsService(User);
const usersController = usersControllerSetup({
  db_service: usersService,
  constants: userConstants,
  errors: ApiError,
});

usersRouter
  .get('/', usersController.getUsers)
  .post('/', usersController.postUserInfo);

usersRouter
  .get("/:id", usersController.getUserById);

export default usersRouter;
