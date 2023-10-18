const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const { rateLimit } = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-7",
});

const middleware = [
  morgan("dev"),
  cors({
    origin: "https://taskmanager-service.netlify.app",
  }),
  helmet(),
  mongoSanitize(),
  hpp(),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true }),
  limiter,
];

module.exports = middleware;
