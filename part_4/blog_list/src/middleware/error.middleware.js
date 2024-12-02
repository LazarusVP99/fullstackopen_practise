import errorNameConfig from '../utils/errorConfig.js';

class ApiError extends Error {
  constructor(message, name, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }

  static ValidationError(message) {
    return new ApiError(message, 'ValidationError', 400);
  }

  static UnauthorizedError(message) {
    return new ApiError(message, 'UnauthorizedError', 401);
  }

  static NotFoundError(message) {
    return new ApiError(message, 'NotFoundError', 404);
  }

  static ForbiddenError(message) {
    return new ApiError(message, 'ForbiddenError', 403);
  }

  static ConflictError(message) {
    return new ApiError(message, 'ConflictError', 409);
  }

  static InternalServerError(message = 'Internal Server Error') {
    return new ApiError(message, 'InternalServerError', 500);
  }
}

const errorHandler = (error, res) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  const errorResponse = typeof errorNameConfig[error.name].message === 'function'
    ? errorNameConfig[error.name].message(error.message)
    : errorNameConfig[error.name].message;

  if (error.name in errorNameConfig) {
    return res
      .status(errorNameConfig[error.name].statusCode)
      .json({ error: errorResponse });
  }

  return ApiError.InternalServerError();
};

const errorMiddlewareHandler = (error, req, res, next) => {
  if (error.message) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  return errorHandler(error, res);
};

export { ApiError, errorMiddlewareHandler };
