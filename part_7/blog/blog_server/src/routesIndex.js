import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import resetDbRouter from './routes/resetDB.routes.js';
import usersRoutes from './routes/users.routes.js';

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
  {
    path: '/test',
    router: resetDbRouter,
  },
];

export default routesIndex;
