import { Router } from 'express';

import resetDBControllerSetup from '../controllers/resetDB.controller.js';

const resetDbRouter = Router();

const { resetDB } = resetDBControllerSetup;

if (process.env.NODE_ENV === 'test') {
  resetDbRouter.delete('/reset', resetDB);
}

export default resetDbRouter;
