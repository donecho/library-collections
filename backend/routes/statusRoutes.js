const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowed = await Borrow.countDocuments();
    const users = await User.countDocuments();

    res.json({
      totalBooks,
      borrowed,
      users
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
