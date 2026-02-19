const express = require("express");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();


// ==============================
// GET Profile
// ==============================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ==============================
// UPDATE Profile
// ==============================
router.put("/me", auth, upload.single("avatar"), async (req, res) => {
  try {
    const { name, address, dob } = req.body;

    const updateData = {
      name,
      address,
      dob
    };

    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ==============================
// GET Saved Books
// ==============================
router.get("/saved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("savedBooks");

    res.json(user.savedBooks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ==============================
// SAVE Book
// ==============================
router.post("/save/:bookId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // ✅ prevent duplicate save (SAFE)
    if (!user.savedBooks.some(id => id.toString() === req.params.bookId)) {
      user.savedBooks.push(req.params.bookId);
      await user.save();
    }

    res.json({ message: "Book saved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ==============================
// UNSAVE Book (optional but useful)
// ==============================
router.delete("/save/:bookId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.savedBooks = user.savedBooks.filter(
      book => book.toString() !== req.params.bookId
    );

    await user.save();

    res.json({ message: "Book removed from saved list" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
