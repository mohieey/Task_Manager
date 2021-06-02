const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: (email) => {
      if (!validator.isEmail(email)) throw new Error("Email is invalid");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate: (age) => {
      if (age < 0) throw new Error("Age must be greater than zero");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    validate: (password) => {
      if (password.toLowerCase().includes("password"))
        throw new Error(`Password can't include "passowrd" word`);
    },
  },
});

module.exports = User;
