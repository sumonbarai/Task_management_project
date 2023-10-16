require("dotenv").config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const SMTP_USER_NAME = process.env.SMTP_USER_NAME;
const SMTP_USER_PASSWORD = process.env.SMTP_USER_PASSWORD;

module.exports = {
  PORT,
  MONGODB_URL,
  JWT_SECRET,
  SMTP_USER_NAME,
  SMTP_USER_PASSWORD,
};
