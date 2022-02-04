const Library = require("../models/libraryModel");

//  Get All Libraries
exports.getLibrary = async (req, res) => {
  try {
    const libraries = await Library.find();

    res.status(200).json({ success: true, libraries });
  } catch (err) {
    res.status(500).json({ success: false, message: "haha" });
  }
};

//  Create New Library
exports.createLibrary = async (req, res) => {

  const {name} = req.body
  const library = await Library.create({name})

  res.status(201).json({success: true, library})

};

//  Update Library
exports.updateLibrary = async (req, res) => {
  let library = await Library.findById(req.params.id)

  if (!library) {
    return res.status(404).json({success: false, message: "Library not found"})
  }

  library = await Library.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true, useFindAndModify: false
  })

  res.status(200).json({success: true, library})
}

//  Delete Library
exports.deleteLibrary = async (req, res) => {
  const library = await Library.findById(req.params.id);

  if (!library) {
    return res.status(404).json({success: false, message: `Library with id: xxx not found`})
  }

  await library.remove();

  res.status(200).json({ success: true, message: "Library was deleted" });
}
