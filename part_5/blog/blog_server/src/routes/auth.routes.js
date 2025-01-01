import { Router } from 'express';

import authControllerSetup from '../controllers/auth.controller.js';
import { ApiError } from '../middleware/error.middleware.js';
import User from '../models/users.model.js';
import ModelsService from '../service/DB_crud.service.js';

const authRouter = Router();

const authService = new ModelsService(User);

const authController = authControllerSetup({
  db_service: authService,
  errors: ApiError,
});

authRouter.post('/', authController.userAuth);

export default authRouter;
