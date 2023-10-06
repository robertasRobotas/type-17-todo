const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  isCompleted: { type: Boolean, required: true },
  title: { type: String, required: true },
  id: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
