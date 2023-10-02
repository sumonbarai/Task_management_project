const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const middleware = [
  morgan("dev"),
  cors(),
  helmet(),
  mongoSanitize(),
  hpp(),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true }),
  limiter,
];

module.exports = middleware;
