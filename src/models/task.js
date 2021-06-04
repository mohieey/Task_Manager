const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  description: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

taskSchema.pre("save", async function (next) {
  const task = this;

  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
