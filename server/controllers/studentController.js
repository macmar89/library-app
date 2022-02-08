const Student = require("../models/studentModel");
const Book = require("../models/bookModel");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();

  res.status(200).json({ success: true, books });
};

//  Create New Student
exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json({ success: true, student });
};

//  Student Detail
exports.getStudentDetail = async (req, res) => {
  const student = await Student.findById(req.params.id).populate({
    path: "history.book",
    select: "title yearOfRelease author",
  });

  if (!student) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, student });
};

//  Update Student
exports.updateStudent = async (req, res) => {
  let student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, student });
};

//  Delete Student
exports.deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await student.remove();

  res.status(200).json({ success: true, message: "Student was deleted" });
};

//  Get Students By Library
exports.getStudentsByLibrary = async (req, res) => {
  const resultPerPage = 10;
  const id = req?.params?.id;

  if (!id) {
    return res.status(404).json({ success: false });
  }

  const userCount = await Student.countDocuments({ libraryId: id });

  const apiFeature = new ApiFeatures(Student.find({ libraryId: id }), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  //
  const users = await apiFeature.query;
  res.status(200).json({ success: true, users, userCount, resultPerPage });
};
