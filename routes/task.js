const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK_BY_ID,
  UPDATE_TASK,
  DELETE_TASK,
} = require("../controller/task");

router.get("/tasks", auth, GET_ALL_TASKS);

router.get("/tasks/:id", GET_TASK_BY_ID);

router.post("/tasks/:userId", auth, ADD_TASK);

router.put("/tasks/:id", auth, UPDATE_TASK);

router.delete("/tasks/:id", auth, DELETE_TASK);

module.exports = router;
