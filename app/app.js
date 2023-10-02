const express = require("express");
const path = require("node:path");
const middleware = require("./middleware");
const router = require("../src/routes/api");
const notFoundHandler = require("./notFoundHandler");
const errorHandler = require("./errorHandler");

const app = express();

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
