const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (user) return res.send(user);
      res.status(404).send("User Not Found");
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((err) => res.status(400).send(err));
});

app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(500).send(err));
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (task) return res.send(task);
      res.status(404).send("Task Not Found");
    })
    .catch((err) => res.status(500).send(err));
});

const port = process.env.PORT || 1998;
app.listen(port, () => console.log("Server is up and running on port " + port));
