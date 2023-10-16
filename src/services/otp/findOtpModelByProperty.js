const OTPModel = require("../../models/OTPModel");

const findOtpModelByProperty = (property, value) => {
  return OTPModel.findOne({ [property]: value });
};

module.exports = findOtpModelByProperty;
