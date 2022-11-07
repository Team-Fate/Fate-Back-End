const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Story = require('../models/Story');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/stories/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
