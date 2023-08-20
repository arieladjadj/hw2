const express = require("express");
const router = express.Router();
const { Student, validate } = require("../models/student");
router.use(express.json());

//get all
router.get("/", async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const students = await Student.find().sort("name");
  res.send(students);
});

//create
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({
    name: req.body.name,
    subject: req.body.subject,
    score: req.body.score,
  });

  student = await student.save();
  res.send(student);
});

//update
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, subject: req.body.subject, score: req.body.score },
    { new: true }
  );

  if (!student) return res.status(404).send("Not found");

  res.send(student);
});

//delete
router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id, {});

  if (!student) return res.status(404).send("Not found");

  // const index = genres.indexOf(genre);
  // const x = genres.splice(index, 1);

  res.send(student);
});

module.exports = router;
