const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, "uploads/covers/");
    } else if (file.fieldname === "pdf") {
      cb(null, "uploads/books/");
    } else {
      cb(null, "uploads/");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// file filter (image + pdf)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 10MB limit
});
