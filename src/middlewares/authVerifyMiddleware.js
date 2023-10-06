const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secret");
const findUserByProperty = require("../services/user/finduserByProperty");
const customError = require("../utils/customeError");

const authVerifyMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: "fail",
        message: "unauthorized request",
      });
    }
    const token = authorization.split(" ")[1];
    // checking token validation
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(403).json({
          status: "fail",
          message: "forbidden",
        });
      }
      // if token is valid and user in my database
      const user = await findUserByProperty({ _id: decoded._id });
      if (!user) throw customError(401, "invalid token");

      req.headers._id = decoded._id;
      req.headers.email = decoded.email;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authVerifyMiddleware;
