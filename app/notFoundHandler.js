const customError = require("../src/utils/customeError");

const notFoundHandler = (req, res, next) => {
  const error = customError(404, "route not found");
  next(error);
};

module.exports = notFoundHandler;
