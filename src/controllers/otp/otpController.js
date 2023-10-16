const OTPModel = require("../../models/OTPModel");

const findUserByProperty = require("../../services/user/finduserByProperty");
const sendEmail = require("../../utils/SendEmail");
const customError = require("../../utils/customeError");

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await findUserByProperty({ email: email });

    // checking user is exits or not
    if (!user) {
      throw customError(404, "email is not registered");
    }
    const otpCode = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000;

    // implement upset method in otp model
    const result = await OTPModel.updateOne(
      { email: email },
      { email: email, otp: otpCode, status: false },
      { upsert: true }
    );

    await sendEmail(
      email,
      `your otp code = ${otpCode}`,
      "Task Manager OTP Verification"
    );

    // response to client
    return res.status(200).json({
      message: "otp successfully send",
    });
  } catch (error) {
    next(error);
  }
};
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.params;
    // checking email and opt is exits or not
    if (otp == 0) {
      throw customError(400, "invalid user email and opt code");
    }

    const filter = { email: email, otp: otp };
    const otpUser = await OTPModel.findOne(filter);

    // checking email and opt is exits or not
    if (!otpUser) {
      throw customError(400, "invalid user email and opt code");
    }

    // status update
    otpUser.otp = 0;
    otpUser.status = true;
    await otpUser.save();
    // response to client
    return res.status(200).json({
      message: "otp verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendOTP, verifyOTP };
