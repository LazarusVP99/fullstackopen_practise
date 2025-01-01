import { Router } from 'express';
import routesIndex from '../routesIndex.js';

const router = Router();

routesIndex.forEach((routes) => {
  router.use(routes.path, routes.router);
});

export default router;
