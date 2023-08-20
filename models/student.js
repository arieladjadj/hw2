const mongoose = require("mongoose");
const Joi = require("joi");

//declare model and scehma
const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    subject: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    dateCreate: {
      required: true,
      type: Date,
      default: Date.now,
    },
  })
);

//validate Student
function validateStudent(student) {
  const studentValidationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    subject: Joi.string().min(3).max(50).required(),
    score: Joi.number().min(0).max(100).required(),
  });

  return studentValidationSchema.validate(student);
}

module.exports.Student = Student;
exports.validate = validateStudent;
