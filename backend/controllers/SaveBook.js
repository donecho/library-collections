const mongoose = require("mongoose");

const savedBookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedBook", savedBookSchema);
