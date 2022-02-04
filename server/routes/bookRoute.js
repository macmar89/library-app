const router = require("express").Router();
const {getAllBooks, createBook, updateBook, getAllBooksFromLibrary}  = require('../controllers/bookController')

router.route("/book").get(getAllBooks).post(createBook);

router.route('/book/:id').put(updateBook)

router.route('/:libraryId/books').get(getAllBooksFromLibrary)



module.exports = router;
