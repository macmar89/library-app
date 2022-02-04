const Book = require('../models/bookModel')

//  Get All Books
exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find()

  res.status(200).json({success: true, books})
}

//  Create New Book
exports.createBook = async (req, res, next) => {
  const book = await Book.create(req.body)

  res.status(201).json({success: true, book})
}

//  Update Book
exports.updateBook = async (req, res) => {
  let book = await Book.findById(req.params.id)

  if (!book) {
    return res.status(404, "Book not found")
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,  useFindAndModify: false
  })

  res.status(200).json({success: true, book})
}

//  Get All Books From Library
exports.getAllBooksFromLibrary = async (req, res, next) => {
  const id  = req.params.libraryId
  const books = await Book.find({libraryId: id})

  res.status(200).json({success: true, books})
}
