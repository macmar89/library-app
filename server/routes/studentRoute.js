const router = require("express").Router();
const {
  createStudent,
  updateStudent,
  deleteStudent,getStudentsByLibrary
} = require("../controllers/studentController");

router.route("/user").post(createStudent);

router.route("/user/:id").put(updateStudent).delete(deleteStudent);

router.route('/:librarySlug/students').get(getStudentsByLibrary)

module.exports = router;
