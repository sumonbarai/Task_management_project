const { default: mongoose } = require("mongoose");
const TaskModel = require("../../models/TaskModel");
const customError = require("../../utils/customeError");

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.headers._id;
    const result = await TaskModel.create({ userId, title, description });

    // response to client
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateTaskByStatus = async (req, res, next) => {
  try {
    const { taskId, status } = req.params;
    const userId = req.headers._id;

    const filter = {
      userId,
      _id: taskId,
    };
    const task = await TaskModel.findOne(filter);

    if (!task) {
      throw customError(400, "invalid task id");
    }
    // update task status
    task.status = status ?? task.status;
    await task.save();
    // response to client
    return res.status(200).json({
      message: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.headers._id;

    const filter = {
      userId,
      _id: taskId,
    };
    const task = await TaskModel.findOne(filter);

    if (!task) {
      throw customError(400, "invalid task id");
    }

    // delete task

    await task.deleteOne();
    // response to client
    return res.status(200).json({
      message: "Task delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

const listTaskByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const userId = req.headers._id;

    const task = await TaskModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), status } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
        },
      },
    ]);

    // response to client
    return res.status(200).json({
      message: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const TaskByStatusCount = async (req, res, next) => {
  try {
    const userId = req.headers._id;

    const task = await TaskModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$status",
          total: { $count: {} },
        },
      },
    ]);

    // response to client
    return res.status(200).json({
      message: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  updateTaskByStatus,
  deleteTask,
  listTaskByStatus,
  TaskByStatusCount,
};
