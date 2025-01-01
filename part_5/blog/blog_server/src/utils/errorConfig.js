const errorNameConfig = {
  ValidationError: {
    statusCode: 400,
    message: (message) => message,
  },
  MongoServerError: {
    statusCode: 400,
    message: 'Name must be unique',
  },
  CastError: {
    statusCode: 404,
    message: 'Malformatted ID',
  },
  JsonWebTokenError: {
    statusCode: 401,
    message: 'Invalid token',
  },
  TokenExpiredError: {
    statusCode: 401,
    message: 'Token expired',
  },
  InternalServerError: {
    statusCode: 500,
    message: 'Internal Server Error',
  },
};

export default errorNameConfig;
