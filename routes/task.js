const express = require("express");
const router = express.Router();
const {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK_BY_ID,
  SET_TASK_DONE,
} = require("../controller/task");

console.log(ADD_TASK);

router.get("/get-all-tasks", GET_ALL_TASKS);

router.post("/add-task", ADD_TASK);

router.get("/get-task-by-id/:id", GET_TASK_BY_ID);

router.get("/set-task-done/:id", SET_TASK_DONE);

router.use((req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

module.exports = router;
