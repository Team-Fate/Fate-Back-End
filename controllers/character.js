const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Character = require('../models/Character');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/characters/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
