const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const ctrl = require('../controllers/dashboardController');

router.get('/', auth, role('admin'), ctrl.stats);

module.exports = router;
