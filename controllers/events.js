const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Event = require('../models/Event');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/events/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
