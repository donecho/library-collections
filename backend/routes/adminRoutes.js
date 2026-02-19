const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ctrl = require("../controllers/adminController");

router.get("/stats", auth, role("admin"), ctrl.stats);

module.exports = router;