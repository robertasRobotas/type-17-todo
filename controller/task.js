const TaskModel = require("../models/task");
const UserModel = require("../models/user");

const GET_ALL_TASKS = async (req, res) => {
  try {
    const response = await TaskModel.find();
    return res.json({ tasks: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const GET_TASK_BY_ID = async (req, res) => {
  try {
    const response = await TaskModel.findById(req.params.id);
    return res.json({ task: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const ADD_TASK = async (req, res) => {
  try {
    const task = new TaskModel({ title: req.body.title, isCompleted: false });
    // modely yra neprivalomas id aprasytas
    const id = task._id.toString();
    task.id = id;

    const taskResponse = await task.save();

    console.log("req.body.userId", req.body.userId);

    UserModel.updateOne(
      { _id: req.body.userId },
      { $push: { user_tasks: taskResponse._id } }
    ).exec();

    return res
      .status(201)
      .json({ response: "Task was added", task: taskResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const UPDATE_TASK = async (req, res) => {
  try {
    const response = await TaskModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res
      .status(200)
      .json({ status: "Task was updated", response: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const DELETE_TASK = async (req, res) => {
  try {
    const response = await TaskModel.findByIdAndDelete(req.params.id);

    if (response === null) {
      return res
        .status(404)
        .json({ response: "Task not exist, so we can not delete it" });
    }

    return res.json({ response: response, status: "Task was deleted" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

module.exports = {
  GET_ALL_TASKS,
  ADD_TASK,
  GET_TASK_BY_ID,
  UPDATE_TASK,
  DELETE_TASK,
};
