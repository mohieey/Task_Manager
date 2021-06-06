const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../src/models/user");
const Task = require("../src/models/task");

const testUserId = mongoose.Types.ObjectId();
const testUser = {
  _id: testUserId,
  name: "Test User",
  email: "test@test.test",
  age: 24,
  password: "12345678",
  tokens: [
    {
      token: jwt.sign({ _id: testUserId }, process.env.jwtSecretKey, {
        expiresIn: "7 days",
      }),
    },
  ],
};

const testUser2Id = mongoose.Types.ObjectId();
const testUser2 = {
  _id: testUser2Id,
  name: "Test User 2",
  email: "test2@test.test",
  age: 24,
  password: "12345678",
  tokens: [
    {
      token: jwt.sign({ _id: testUserId }, process.env.jwtSecretKey, {
        expiresIn: "7 days",
      }),
    },
  ],
};

const taskOne = {
  _id: mongoose.Types.ObjectId(),
  description: "Task one",
  completed: false,
  user: testUserId,
};

const taskTwo = {
  _id: mongoose.Types.ObjectId(),
  description: "Task two",
  completed: false,
  user: testUser2Id,
};

const taskThree = {
  _id: mongoose.Types.ObjectId(),
  description: "Task three",
  completed: false,
  user: testUserId,
};

const setupTestDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(testUser).save();
  await new User(testUser2).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  testUserId,
  testUser,
  setupTestDatabase,
  taskOne,
  taskTwo,
  taskThree,
};
