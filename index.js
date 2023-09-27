const express = require("express");
const app = express();

app.use(express.json());

const tasks = [];

app.post("/add-task", (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    isCompleted: req.body.isCompleted,
  };

  tasks.push(task);

  return res.status(201).json({ response: "Task was added" });
});

app.get("/get-all-task", (req, res) => {
  return res.json({ response: tasks });
});

app.get("/get-first-five-tasks", (req, res) => {
  return res.json({ tasks: tasks.slice(0, 5) });
});

app.use((req, res, next) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

app.listen(3000, () => {
  console.log("App started");
});

// [{ id, title, isCompleted }]
