const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  quantity: Number,
  pdf: String,     // file path
  cover: String    // image path
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
