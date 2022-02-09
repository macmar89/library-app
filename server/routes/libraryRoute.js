const {
  createLibrary,
  getLibrary,
  deleteLibrary,
  updateLibrary,
  getLibraryDetail,
} = require("../controllers/libraryController");
const router = require("express").Router();

router.route("/libraries").get(getLibrary);

router.route("/library").post(createLibrary);

router.route("/library/:id").delete(deleteLibrary).put(updateLibrary);

router.route("/library/:slug").get(getLibraryDetail);



module.exports = router;
