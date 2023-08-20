const express = require("express");
const mongoose = require("mongoose");

const Joi = require("joi");
const app = express();
app.use(express.json());
const students = require("./routes/students");

//conecting mongo db
mongoose
  .connect("mongodb://127.0.0.1/students")
  .then(() => console.log("Connected..."))
  .catch(() => console.log("Error: mongodb"));

app.use("/api/students", students);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port ", port, " ..."));
