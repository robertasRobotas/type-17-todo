const { v4: uuidv4 } = require("uuid");

let tasks = [];

const GET_ALL_TASKS = (req, res) => {
  console.log("yyyyyyyyy");
  return res.json({ response: tasks });
};

const ADD_TASK = (req, res) => {
  console.log("xxxxxxxxxxxxx");
  const task = {
    id: uuidv4(),
    title: req.body.title,
    isCompleted: false,
  };

  tasks.push(task);

  return res.status(201).json({ response: "Task was added" });
};

const GET_TASK_BY_ID = (req, res) => {
  const task = tasks.find((t) => {
    return t.id === req.params.id;
  });

  if (!task) {
    return res.status(404).json({ response: "Task not found" });
  }

  return res.json({ task: task });
};

const UPDATE_TASK = (req, res) => {
  const taskIndex = tasks.findIndex((task) => {
    return task.id === req.params.id;
  });

  console.log(req.body);

  if (taskIndex === -1) {
    return res.status(404).json({ response: "Task not found" });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };

  return res.json({ task: tasks[taskIndex] });
};

const DELETE_TASK = (req, res) => {
  const filteredTasks = tasks.filter((task) => task.id !== req.params.id);

  tasks = filteredTasks;

  return res.status(200).json({ tasks: tasks });
};

module.exports = {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK_BY_ID,
  UPDATE_TASK,
  DELETE_TASK,
};
