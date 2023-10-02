const customError = (status = 500, message = "Something Went Wrong") => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = customError;
