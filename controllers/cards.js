const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Card = require('../models/Card');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/cards/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
