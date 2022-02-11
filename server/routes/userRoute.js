const router = require("express").Router();
const {
  getUserBookHistory,
  createUser,
  getUserDetail,
  updateUser,
  deleteUser,
  getUsersByLibrary,
} = require("../controllers/userController");

router.route("/user").post(createUser);

router.route("/user/:id").get(getUserDetail).put(updateUser).delete(deleteUser);

router.route("/user/:id/history").get(getUserBookHistory);

router.route("/:id/users").get(getUsersByLibrary);

module.exports = router;
