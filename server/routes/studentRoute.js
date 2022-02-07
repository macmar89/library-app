const router = require("express").Router();
const {
  createStudent,
  updateStudent,
  deleteStudent,getStudentsByLibrary, getStudentDetail
} = require("../controllers/studentController");

router.route("/user").post(createStudent);

router.route("/user/:id").get(getStudentDetail).put(updateStudent).delete(deleteStudent);

router.route('/:id/users').get(getStudentsByLibrary)

module.exports = router;
