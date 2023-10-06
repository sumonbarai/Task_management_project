const express = require("express");
const authController = require("../controllers/auth/authController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const userController = require("../controllers/user/userController");
const taskController = require("../controllers/task/taskController");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    message: "ok",
  });
});

// auth
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// user
router.post("/profileUpdate", authVerifyMiddleware, userController.profileUpdate);

// Task
router.post("/createTask", authVerifyMiddleware, taskController.createTask);
router.patch("/updateTaskByStatus/:taskId/:status", authVerifyMiddleware, taskController.updateTaskByStatus);
router.delete("/deleteTask/:taskId", authVerifyMiddleware, taskController.deleteTask);
router.get("/listTaskByStatus/:status", authVerifyMiddleware, taskController.listTaskByStatus);
router.get("/TaskByStatusCount", authVerifyMiddleware, taskController.TaskByStatusCount);

module.exports = router;
