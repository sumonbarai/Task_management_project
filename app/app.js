const express = require("express");
const path = require("path");
const middleware = require("./middleware");
const router = require("../src/routes/api");
const notFoundHandler = require("./notFoundHandler");
const errorHandler = require("./errorHandler");
const customError = require("../src/utils/customeError");

const app = express();

// only for accept my client side application
app.use((req, res, next) => {
  const clientHostName = req.headers.host;
  if (clientHostName !== "taskmanager-service.netlify.app") {
    throw customError(406, "your request not acceptable");
  }
  next();
});

// public folder binding
const public = path.join(__dirname, "../", "public");

app.use(express.static(public));

app.use(middleware);

app.use("/api/v1", router);

// 404 route setup
app.use(notFoundHandler);

// error handler middleware
app.use(errorHandler);

module.exports = app;
