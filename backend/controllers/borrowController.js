const Borrow = require("../models/Borrow");
const Book = require("../models/Book");


// 📚 Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1)
      return res.status(400).json({ message: "No copies available" });

    // create borrow record
    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // decrease copies
    book.availableCopies -= 1;
    await book.save();

    res.json({ message: "Book borrowed successfully", borrow });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// 📚 Return book
exports.returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.returned)
      return res.status(400).json({ message: "Book already returned" });

    borrow.returned = true;
    borrow.returnDate = new Date();
    await borrow.save();

    // increase book copies
    const book = await Book.findById(borrow.book);
    book.availableCopies += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// 📚 User borrowed books
exports.myBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// 📚 Admin: all borrowed books
exports.allBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("book")
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ⏰ Overdue books
exports.overdueBorrows = async (req, res) => {
  try {
    const today = new Date();

    const overdue = await Borrow.find({
      dueDate: { $lt: today },
      returned: false,
    })
      .populate("book")
      .populate("user", "email");

    res.json(overdue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
