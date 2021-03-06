const Book = require("../models/bookModel");
const ApiFeatures = require("../utils/ApiFeatures");
const slug = require("slug");

//  Get All Books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();

  res.status(200).json({ success: true, books });
};

//  Create New Book
exports.createBook = async (req, res) => {
  const book = await Book.create({ ...req.body, slug: slug(req.body.title) });

  res.status(201).json({ success: true, book });
};

//  Update Book
exports.updateBook = async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404, "Book not found");
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, book });
};

//  Delete Book
exports.deleteBook = async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);

  if (!deletedBook) {
    return res
      .status(404)
      .json({
        success: false,
        message: `Book with id: ${req.body.id} not found`,
      });
  }

  res.status(200).json({ success: false, message: "Book was deleted" });
};

//  Get All Books From Library
exports.getAllBooksFromLibrary = async (req, res) => {
  const resultPerPage = 10;
  const id = req.params.libraryId;

  if (!id) {
    return res.status(404).json({ success: false });
  }

  const bookCount = await Book.countDocuments({ libraryId: id });

  const apiFeature = new ApiFeatures(Book.find({ libraryId: id }), req.query)
    .searchBook()
    .filter()
    .pagination(resultPerPage);

  const books = await apiFeature.query;
  res.status(200).json({ success: true, books, bookCount, resultPerPage });
};

//  Get Book By ID
exports.getBookDetail = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('borrowed.whoBorrowed');

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  res.status(200).json({ success: true, book });
};
