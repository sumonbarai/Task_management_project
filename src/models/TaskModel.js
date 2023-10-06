const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "pending", "completed"],
      default: "new",
    },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = model("Task", dataSchema);
module.exports = TaskModel;
