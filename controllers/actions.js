const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Action = require('../models/Action');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/actions/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
