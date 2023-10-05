const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secret");

const authVerifyMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized request",
    });
  }
  const token = authorization.split(" ")[1];
  // checking token validation
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        status: "fail",
        message: "forbidden",
      });
    }
    // if token is valid
    req.headers._id = decoded._id;
    req.headers.email = decoded.email;

    next();
  });
};

module.exports = authVerifyMiddleware;
