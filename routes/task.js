const express = require("express");
const router = express.Router();
const {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK_BY_ID,
  UPDATE_TASK,
  DELETE_TASK,
} = require("../controller/task");

router.get("/tasks", GET_ALL_TASKS);

router.get("/tasks/:id", GET_TASK_BY_ID);

router.post("/tasks", ADD_TASK);

router.put("/tasks/:id", UPDATE_TASK);

router.delete("/tasks/:id", DELETE_TASK);

router.use((req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

module.exports = router;
