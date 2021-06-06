const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const multer = require("multer");
const app = express();

// app.use((req, res, next) => {
//   res.status(503).send("Sorry, we're under maintenance right now.");
// });

app.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/16084742/TzY4eEtz");
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
