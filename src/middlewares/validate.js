import { ClientError } from '../exceptions/index.js';

const validate = (schema) => (req, res, next) => {
  console.log('Validating body:', req.body);
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    console.log('Validation Error:', message);
    return next(new ClientError(message, 400));
  }

  req.validated = value;
  console.log('Validation Success, req.validated set');
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(new ClientError(message, 400));
  }

  req.validated = value;
  next();
};

export { validate };