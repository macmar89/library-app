const router = require("express").Router();
const {
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.route("/user").post(createStudent);

router.route("/user/:id").put(updateStudent).delete(deleteStudent);

module.exports = router;
