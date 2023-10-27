const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secret");

const createToken = (data) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "1m" });
};

module.exports = createToken;
