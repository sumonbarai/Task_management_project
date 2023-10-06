const bcrypt = require("bcrypt");
const { registerService } = require("../../services/auth/authService");
const findUserByProperty = require("../../services/user/finduserByProperty");
const createToken = require("../../utils/createToken");
const customError = require("../../utils/customeError");

const registerUser = async (req, res, next) => {
  try {
    const reqBody = req.body;
    if (!reqBody.email) {
      throw customError(400, "user email required");
    }

    const user = await registerService(reqBody);

    delete user._doc.password;
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw customError(400, "email and password required");
    }

    // find email exist in database
    const user = await findUserByProperty("email", email);
    if (!user) {
      throw customError(400, "invalid user email and password");
    }

    // password match for user
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw customError(400, "invalid user email and password");

    // make sure email address is exist and create jwt token
    const token = createToken({ _id: user._id, email: user.email });

    const response = {
      _id: user._id,
      email: user.email,
      fistName: user.fistName,
      lastName: user.lastName,
      mobile: user.mobile,
      photo: user.photo,
    };

    return res.status(200).json({
      message: "success",
      token,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
