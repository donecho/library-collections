const User = require('../models/User');
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');

exports.stats = async (req,res)=>{
  const users = await User.countDocuments();
  const books = await Book.countDocuments();
  const borrows = await Borrow.countDocuments();

  res.json({ users, books, borrows });
};
