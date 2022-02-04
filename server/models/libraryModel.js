const mongoose = require("mongoose");

const librarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter library name"],
      trim: true,
    },
    students: { type: Array, default: [] },
    books: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
