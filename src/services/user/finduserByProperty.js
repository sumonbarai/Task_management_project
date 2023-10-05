const UserModel = require("../../models/UserModel");

const findUserByProperty = (property, value) => {
  return UserModel.findOne({ [property]: value });
};

module.exports = findUserByProperty;
