const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    desc: { type: String, required: true },
    yearOfRelease: { type: Number },
    libraryId: { type: Schema.Types.ObjectId, ref: "Library", required: true },
    isBorrowed: { type: Boolean, default: false },
    whoBorrowed: { type: Schema.Types.ObjectId, ref: "Student" },
    borrowedDate: { type: String, default: "" },
    borrowed: {
      isBorrowed: { type: Boolean, required: true, default: false },
      whoBorrowed: { type: Schema.Types.ObjectId, ref: "Student" },
      borrowedDate: { type: String, default: "-" },
    },
    lastBorrowing: { type: String, default: "not yet" },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Book", bookSchema);
