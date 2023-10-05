const UserModel = require("../../models/UserModel");
const customError = require("../../utils/customeError");
const findUserByProperty = require("../user/finduserByProperty");

const registerService = async (reqBody) => {
  // check user email is exist or not
  const result = await findUserByProperty("email", reqBody.email);
  if (result) {
    throw customError(400, "user email already exits");
  }

  const user = new UserModel({ ...reqBody });
  return user.save();
};

module.exports = { registerService };
