const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    otp: {
      type: String,
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const OTPModel = model("otp", dataSchema);
module.exports = OTPModel;
