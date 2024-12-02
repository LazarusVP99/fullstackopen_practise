import { Router } from 'express';

import authRoutes from './auth.routes.js';
import blogRoutes from './blog.routes.js';
import usersRoutes from './users.routes.js';

const router = Router();

const routesIndex = [
  {
    path: '/blogs',
    router: blogRoutes,
  },
  {
    path: '/users',
    router: usersRoutes,
  },
  {
    path: '/auth',
    router: authRoutes,
  },
];

routesIndex.forEach((routes) => {
  router.use(routes.path, routes.router);
});

export default router;
