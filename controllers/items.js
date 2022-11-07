const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Item = require('../models/Item');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/items/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
