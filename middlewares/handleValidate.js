import { validationResult } from 'express-validator';

const handleValidate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    const firstError = formattedErrors[0];

    return next({
      status: 400,
      field: firstError.field,
      message: firstError.message,
      errors: formattedErrors,
    });
  }

  next();
};

export default handleValidate;
