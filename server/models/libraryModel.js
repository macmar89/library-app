const mongoose = require("mongoose");

const librarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter library name"],
      trim: true,
    },
    slug: { type: String, required: true },
    students: { type: Array, default: [] },
    books: { type: Array, default: [] },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      state: { type: String, required: true },
    },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
