const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please Enter last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter email"],
      validate: [validator.isEmail, "Please Enter a valid email"],
    },
    libraryId: { type: String, required: true },
    borrowedBooks: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        borrowedDate: { type: Date },
      },
    ],
    history: [
      {
        book: { type: Schema.Types.ObjectId, ref: "Book" },
        borrowedDate: { type: String, required: true },
        returnedDate: { type: String, required: true },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
