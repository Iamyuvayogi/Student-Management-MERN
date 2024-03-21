const Student = require("../models/Student.js");

const addStudentsController = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getStudentsController = async (req, res) => {
  try {
    let query = {};
    if (req.query.batch) {
      query.batch = req.query.batch;
    }
    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }
    const students = await Student.find(query).sort({ createdAt: -1 });
    res.send(students);
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteStudentContoller = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }
    res.send({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addStudentsController,
  getStudentsController,
  updateStudentController,
  deleteStudentContoller,
};
