const Book = require("../models/Book");
const User = require("../models/User");

exports.stats = async (req, res) => {
  try {
    const books = await Book.countDocuments();
    const users = await User.countDocuments();

    // 🔥 find most saved book
    const result = await User.aggregate([
      { $unwind: "$savedBooks" },
      {
        $group: {
          _id: "$savedBooks",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    let mostSavedBook = "No saves yet";

    if (result.length > 0) {
      const book = await Book.findById(result[0]._id);
      if (book) mostSavedBook = book.title;
    }

    res.json({
      books,
      users,
      mostSavedBook
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
