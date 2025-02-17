import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

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
app.use(morgan('dev'));
app.use(express.json());

// token middleware to retrieve token from request header
app.use(tokenMiddleware.accessToken);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Blog API</h1>');
});

// routes
app.use('/api', router);

// error middleware handlers
app.use(errorMiddlewareHandler);
app.use(ApiError);

(async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.errors('Failed to start server');
    process.exit(1);
  }
})();

export default app;
