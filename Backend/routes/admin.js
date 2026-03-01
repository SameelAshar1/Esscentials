const express = require('express');
const { loginAdmin } = require('../controllers/adminController');

const router = express.Router();

// POST /api/admin/login - authenticate admin and return JWT
router.post('/login', loginAdmin);

module.exports = router;

