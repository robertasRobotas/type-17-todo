const { ObjectId } = require("mongodb");

const UserModel = require("../models/user");

const GET_ALL_USERS = (req, res) => {
  UserModel.find().then((response) => {
    return res.json({ users: response });
  });
};

const GET_USER_BY_ID = (req, res) => {
  UserModel.findById(req.params.id).then((response) => {
    return res.json({ user: response });
  });
};

const GET_USER_BY_ID_WITH_TASKS = (req, res) => {
  UserModel.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "user_tasks",
        foreignField: "id",
        as: "user_tasks_data",
      },
    },
    { $match: { _id: new ObjectId(req.params.id) } },
  ])
    .exec()
    .then((response) => {
      console.log(response);
      return res.json({ user: response });
    });
};

const ADD_USER = (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    user_tasks: [],
  });

  user
    .save()
    .then((dbResponse) => {
      return res
        .status(201)
        .json({ response: "User was added", user: dbResponse });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
      res.status(500).json({ response: "something went wrong" });
    });
};

module.exports = {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_TASKS,
};
