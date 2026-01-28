import { ClientError } from '../exceptions/index.js';

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnkown: true,
    });

    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(new ClientError(message, 400));
    }

    req.validated = value;
    next();
};

export const validateQuery = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
        abortEarly: false,
        allowUnknown: true,
        stripUnkown: true,
    });

    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(new ClientError(message, 400));
    }

    req.validated = value;
    next();
};

export default validate;