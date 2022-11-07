const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const NPC = require('../models/NPC');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/npcs/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
