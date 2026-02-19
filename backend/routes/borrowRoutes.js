const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/borrowController');

router.post('/', auth, ctrl.borrowBook);
router.delete('/:id', auth, ctrl.returnBook);

module.exports = router;
