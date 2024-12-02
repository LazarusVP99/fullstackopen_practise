import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import { connectMongoDB } from './db/connect.db.js';
import {
  ApiError,
  errorMiddlewareHandler,
} from './middleware/error.middleware.js';
import tokenMiddleware from './middleware/token.middleware.js';
import router from './routes/routes.js';
import { config, logger } from './utils/index.js';

const { PORT } = config;

const app = express();

app.use(cors());
app.use(express.json());
// token middleware to retrieve token from request header
app.use(tokenMiddleware.accessToken);

connectMongoDB();

app.use('/api', router);

// error middleware handlers
app.use(errorMiddlewareHandler);
app.use(ApiError);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
