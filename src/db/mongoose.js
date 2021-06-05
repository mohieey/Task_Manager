const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Atlas"));
