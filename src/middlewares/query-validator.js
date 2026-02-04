import { ClientError } from '../exceptions/index.js';

// Middleware untuk mendeteksi duplicate query parameters
const queryValidator = (req, res, next) => {
  const queryString = req.url.split('?')[1];

  if (!queryString) {
    return next();
  }

  const params = queryString.split('&');
  const seenKeys = new Set();

  for (const param of params) {
    const key = param.split('=')[0];

    if (seenKeys.has(key)) {
      return next(new ClientError(`Parameter "${key}" tidak boleh duplikat`, 400));
    }

    seenKeys.add(key);
  }

  next();
};

export default queryValidator;
