const router = require("express").Router();
const {
  getAllBooks,
  createBook,
  updateBook,
  getAllBooksFromLibrary,
  getBookDetail,
  deleteBook,
} = require("../controllers/bookController");

router.route("/book").get(getAllBooks).post(createBook);

router.route("/book/:id").get(getBookDetail).put(updateBook).delete(deleteBook);

router.route("/:libraryId/books").get(getAllBooksFromLibrary);

module.exports = router;
