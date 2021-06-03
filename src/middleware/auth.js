const { jwtSecretKey } = require("../../keys");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const payLoad = await jwt.verify(token, jwtSecretKey);
    const user = await User.findOne({
      _id: payLoad._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.send({ error: "Please, login or register" });
  }
};

module.exports = auth;
