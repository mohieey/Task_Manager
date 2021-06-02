const { dbConnectionString } = require("../../keys");
const mongoose = require("mongoose");
mongoose
  .connect(dbConnectionString, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to Atlas"));
