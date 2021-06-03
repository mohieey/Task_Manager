const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
