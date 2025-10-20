const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const field = err.field || null;

  res.status(status).json({
    success: false,
    message,
    field,
  });
};

export default errorHandler;
