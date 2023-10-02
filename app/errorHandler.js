const errorHandler = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : "internal server error";
  // console log
  if (status >= 500) {
    console.log(err);
  }

  res.status(status).json({
    message: message,
  });
};

module.exports = errorHandler;
