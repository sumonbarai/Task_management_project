const OTPModel = require("../../models/OTPModel");
const findUserByProperty = require("../../services/user/finduserByProperty");
const customError = require("../../utils/customeError");

const profileUpdate = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const _id = req.headers._id;
    const user = await findUserByProperty({ _id: _id });

    // checking user is exits or not
    if (!user) {
      throw customError(404, "invalid user");
    }

    // update user profile
    user.email = reqBody.email ?? user.email;
    user.fistName = reqBody.fistName ?? user.fistName;
    user.lastName = reqBody.lastName ?? user.lastName;
    user.mobile = reqBody.mobile ?? user.mobile;
    user.photo = reqBody.photo ?? user.photo;
    await user.save();

    // response to client
    return res.status(200).json({
      message: "update successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const filter = { email: email, status: true };
    const isUpdatableUser = await OTPModel.findOne(filter);

    // checking user is exits or not
    if (!isUpdatableUser) {
      throw customError(400, "password change request rejected");
    }

    // find user for update this password
    const user = await findUserByProperty("email", email);

    // update user profile
    user.password = password ?? user.password;
    await user.save();

    // update opt model
    isUpdatableUser.status = false;
    await isUpdatableUser.save();

    // response to client
    return res.status(200).json({
      message: "password update successfully please login",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { profileUpdate, resetPassword };
