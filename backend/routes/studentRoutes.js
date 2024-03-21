const express = require("express");
const router = express.Router();

const {
  addStudentsController,
  getStudentsController,
  updateStudentController,
  deleteStudentContoller,
} = require("../controllers/studentController.js");

router.post("/add-student", addStudentsController);
router.get("/get-students", getStudentsController);
router.put("/update-student/:id", updateStudentController);
router.delete("/delete-student/:id", deleteStudentContoller);

module.exports = router;
