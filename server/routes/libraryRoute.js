const {
  createLibrary,
  getLibrary,
  deleteLibrary,
  updateLibrary,
} = require("../controllers/libraryController");
const router = require("express").Router();

router.route("/libraries").get(getLibrary);

router.route("/library").post(createLibrary);

router.route("/library/:id").delete(deleteLibrary).put(updateLibrary);

module.exports = router;
