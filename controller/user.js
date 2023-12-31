const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      user_tasks: [],
      password: hash,
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const LOGIN = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ response: "bad auth" });
  }

  bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
    if (!isPasswordMatch || err) {
      return res.status(401).json({ response: "bad auth" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      {
        algorithm: "RS256",
      }
    );

    return res.status(201).json({ jwt: token });
  });
};

module.exports = {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_TASKS,
  LOGIN,
};
