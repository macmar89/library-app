const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: {
    type: String, required: true, trim : true
  },
  desc: {type: String, required: true},
  yearOfRelease: {type: Number},
  libraryId: {type: String }
}, {timeStamp: true})

module.exports = mongoose.model("Book", bookSchema)
