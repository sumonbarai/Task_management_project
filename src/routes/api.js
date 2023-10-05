const express = require("express");
const authController = require("../controllers/auth/authController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const userController = require("../controllers/user/userController");

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

module.exports = router;
