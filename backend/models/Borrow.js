const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  returnDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Borrow', borrowSchema);
