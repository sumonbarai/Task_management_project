const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    fistName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    mobile: {
      type: String,
      required: [true, "mobile number  is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = model("User", dataSchema);
module.exports = UserModel;
