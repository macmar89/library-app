const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String, required: true, trim : true
  },
  slug: {type: String, required: true},
  desc: {type: String, required: true},
  yearOfRelease: {type: Number},
  libraryId: {type: String },
  borrowed: {
    isBorrowed: {type: Boolean, default: false},
    // whoBorrowed: {type: String, default: ''},
    whoBorrowed: {type: Schema.Types.ObjectId, ref: "Student"},
    borrowedDate: {type: String, default: ''}
  }
}, {timeStamp: true})

module.exports = mongoose.model("Book", bookSchema)
