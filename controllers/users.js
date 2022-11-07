const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/users/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
