const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const { PRINT_INFO } = require("./controller/task");

app.use(express.json());

const tasks = [];

app.post("/add-task", (req, res) => {
  const task = {
    id: uuidv4(),
    title: req.body.title,
    isCompleted: false,
  };

  tasks.push(task);

  return res.status(201).json({ response: "Task was added" });
});

app.get("/get-all-tasks", (req, res) => {
  return res.json({ response: tasks });
});

app.post("/print-info", PRINT_INFO);

app.get("/get-task-by-id/:id", (req, res) => {
  const task = tasks.find((t) => {
    return t.id === req.params.id;
  });

  if (!task) {
    return res.status(404).json({ response: "Task not found" });
  }

  return res.json({ task: task });
});

app.get("/set-task-done/:id", (req, res) => {
  const taskIndex = tasks.findIndex((task) => {
    return task.id === req.params.id;
  });

  if (taskIndex === -1) {
    return res.status(404).json({ response: "Task not found" });
  }

  tasks[taskIndex].isCompleted = true;

  return res.json({ taskIndex: tasks });
});

app.use((req, res, next) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

app.listen(3000, () => {
  console.log("App started");
});
