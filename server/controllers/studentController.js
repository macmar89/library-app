const Student = require("../models/studentModel");

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({ success: true, books });
};

//  Create New Student
exports.createStudent = async (req, res, next) => {
  const student = await Student.create(req.body);

  res.status(201).json({ success: true, student });
};

//  Update Student
exports.updateStudent = async (req, res) => {
  let student = await Student.findById(req.params.id)

  if (!student) {
    return res.status(404).json({success: false, message: "User not found"})
  }

  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true, useFindAndModify: false
  })

  res.status(200).json({success: true, student})
}

//  Delete Student
exports.deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id)

  if (!student) {
    return res.status(404).json({success: false, message: "User not found"})
  }

  await student.remove();

  res.status(200).json({ success: true, message: "Student was deleted" });

}


