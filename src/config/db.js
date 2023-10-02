const mongoose = require("mongoose");
const { MONGODB_URL } = require("../../secret");

const connectDb = () => {
  return mongoose.connect(MONGODB_URL, { autoIndex: true });
};

module.exports = connectDb;
