import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

const ErrorHandler = (err, req, res, next) => {
  // Handle JSON parsing errors from body-parser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return response(res, 400, 'Format JSON tidak valid', null);
  }

  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  // Handle Joi validation errors
  if (err.isJoi || err.details) {
    const message = err.details?.[0]?.message || err.message;
    return response(res, 400, message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (status >= 500) {
    console.error('SERVER_ERROR:', err);
  }

  return response(res, status, message, null);
};

export default ErrorHandler;