const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Character = require('../models/Character');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET '/' which will list out all characters (role: admin)
// GET '/' which will list out all characters for current user (role: user)
// GET '/:characterId' which will list a specific character (role: user)
// GET '/:characterId/actions/' which will list out all actions related to specific character (role: user, admin)
// GET '/:characterId/items' which will list out all items related to specific character (role: user, admin)
// POST '/' which will add a new character and return it
// PATCH `/:characterId` which will update a character and return it (role: admin Stretch goal: role: user)
// DELETE `/:characterId` which will delete a character and return list of all characters (role: admin; Stretch goal: role: user [return list of user's characters])

// GET (index) /api/characters/
router.get('/', requireToken, (req, res, next) => {});

module.exports = router;
