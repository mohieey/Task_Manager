const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
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
    tokens: [{ token: { type: String, required: true } }],
    avatar: { type: Buffer },
  },
  { timestamps: true }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.jwtSecretKey,
    {
      expiresIn: "7 days",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");

  const matcheedPassword = await bcrypt.compare(password, user.password);

  if (!matcheedPassword) throw new Error("Unable to login");

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ user: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
