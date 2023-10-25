const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user_tasks: { type: [String], required: false },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
