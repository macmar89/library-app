const Library = require("../models/libraryModel");
const Book = require("../models/bookModel");
const Student = require("../models/userModel");
const slug = require("slug");

//  Get All Libraries
exports.getLibrary = async (req, res) => {
  try {
    const libraries = await Library.find();

    res.status(200).json({ success: true, libraries});
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

//  Create New Library
exports.createLibrary = async (req, res) => {
  const library = await Library.create({
    ...req.body,
    slug: slug(req.body.name),
  });

  res.status(201).json({ success: true, library });
};

//  Update Library
exports.updateLibrary = async (req, res) => {
  let library = await Library.findById(req.params.id);

  if (!library) {
    return res
      .status(404)
      .json({ success: false, message: "Library not found" });
  }

  //  TODO - check
  // library.update((req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  //   useFindAndModify: false,
  // }))

  library = await Library.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, library });
};

//  Delete Library
exports.deleteLibrary = async (req, res) => {
  const library = await Library.findById(req.params.id);

  if (!library) {
    return res
      .status(404)
      .json({ success: false, message: `Library with id: ${req.params.id} not found` });
  }

  await library.remove();

  res.status(200).json({ success: true, message: "Library was deleted" });
};

//  Get Library By Slug
exports.getLibraryDetail = async (req, res) => {
  const { slug } = req.params;

  const library = await Library.findOne({ slug: slug });

  const id = library._id.toString();

  try {
    const newestBooks = await Book.find({ libraryId: id })
      .sort({ createdAt: -1 })
      .limit(5);

    const newestUsers = await Student.find({ libraryId: id })
      .sort({ createdAt: -1 })
      .limit(5);

    res
      .status(200)
      .json({ success: true, library, newestBooks, newestUsers });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

