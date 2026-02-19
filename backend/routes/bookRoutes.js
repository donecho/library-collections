const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ctrl = require("../controllers/bookController");

// ✅ multer upload middleware
const upload = require("../middleware/uploadMiddleware");

// ===============================
// GET BOOKS (Admin + User)
// ===============================
router.get("/", auth, ctrl.getBooks);


// ===============================
// ADD BOOK (Admin Only)
// ===============================
router.post(
  "/add",
  auth,
  role("admin"),
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  ctrl.addBook
);


// ===============================
// UPDATE BOOK (Admin Only)
// ===============================
router.put(
  "/:id",
  auth,
  role("admin"),
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  ctrl.updateBook
);


// ===============================
// DELETE BOOK (Admin Only)
// ===============================
router.delete("/:id", auth, role("admin"), ctrl.deleteBook);


module.exports = router;
