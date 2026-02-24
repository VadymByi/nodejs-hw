export const errorHandler = (err, req, res, next) => {
  console.log(err);

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProduction
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
