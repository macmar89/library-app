const router = require("express").Router();
const {
  createStudent,
  updateStudent,
  deleteStudent,getStudentsByLibrary, getStudentDetail, getUserBookHistory
} = require("../controllers/studentController");

router.route("/user").post(createStudent);

router.route("/user/:id").get(getStudentDetail).put(updateStudent).delete(deleteStudent);

router.route("/user/:id/history").get(getUserBookHistory)


router.route('/:id/users').get(getStudentsByLibrary)



module.exports = router;
