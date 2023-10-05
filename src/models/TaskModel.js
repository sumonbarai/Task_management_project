const { Schema, model } = require("mongoose");
const { schema } = require("./UserModel");

const dataSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, "_id is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },
    status: {
      enum: ["new", "pending", "completed"],
      default: "new",
    },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = model("Task", dataSchema);
module.exports = TaskModel;
