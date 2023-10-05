const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const taskRouter = require("./routes/task");

const app = express();
app.use(express.json());

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("ERROR:", err);
  });

app.use(taskRouter);

// eslint-disable-next-line no-undef
console.log(process.env.DB_CONNECTION);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App started on port ${process.env.PORT}`);
});
