const User = require("../models/userModel");
const ApiFeatures = require("../utils/ApiFeatures");


//  Create New User
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, user });
};

//  User Detail
exports.getUserDetail = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: "history.book",
      select: "title yearOfRelease author",
    })
    .populate({ path: "borrowedBooks.book", select: "_id title author" });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const currentBorrowedBooks = user?.borrowedBooks.length;
  const totalBorrowedBooks = user?.history.length;

  res
    .status(200)
    .json({ success: true, user, currentBorrowedBooks, totalBorrowedBooks });
};

//  Update User
exports.updateUser = async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
};

//  Delete User
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await user.remove();

  res.status(200).json({ success: true, message: "User was deleted" });
};

//  Get Users By Library
exports.getUsersByLibrary = async (req, res) => {
  const resultPerPage = 10;
  const id = req?.params?.id;

  if (!id) {
    return res.status(404).json({ success: false });
  }

  const userCount = await User.countDocuments({ libraryId: id });

  const apiFeature = new ApiFeatures(User.find({ libraryId: id }), req.query)
    .searchLastName()
    .filter()
    .pagination(resultPerPage);
  //
  const users = await apiFeature.query;
  res.status(200).json({ success: true, users, userCount, resultPerPage });
};

//  Get User Book History
exports.getUserBookHistory = async (req,res) => {
  const id = "620408d659765b720dd8b284"

  const user = await User.findById(id)

  res.status(200).json({success: true, user})
}
