const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Character = require('../models/Character');
const Action = require('../models/Action');
const {
	handleValidateOwnership,
	handleValidateAuthorization,
} = require('../middleware/custom_errors');

const defaultActions = async () => {
	const defaultActions = [];
	try {
		const attackAction = await Action.findOne({ name: 'Attack' });
		const defendAction = await Action.findOne({ name: 'Defend' });
		defaultActions.push(attackAction);
		defaultActions.push(defendAction);
		return defaultActions;
	} catch (error) {
		next(error);
	}
};

// GET '/' which will list out all characters (role: admin)
// GET '/' which will list out all characters for current user (role: user)
router.get('/', requireToken, async (req, res, next) => {
	try {
		try {
			handleValidateAuthorization(req, 'admin');
			const characters = await Character.find();
			res.status(200).json(characters);
		} catch (error) {
			const characters = await Character.find({ user: req.user._id });
			res.status(200).json(characters);
		}
	} catch (error) {
		next(error);
	}
});
// GET '/:characterId' which will list a specific character (role: user, admin)
router.get('/:characterId', requireToken, async (req, res, next) => {
	try {
		const character = await Character.findById(req.params.characterId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateOwnership(req, character, 'user');
			} catch (error) {
				throw error;
			}
		}
		res.status(200).json(character);
	} catch (error) {
		next(error);
	}
});
// GET '/:characterId/actions' which will list out all actions related to specific character (role: user, admin)
router.get('/:characterId', requireToken, async (req, res, next) => {
	try {
		const character = await Character.findById(req.params.characterId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateOwnership(req, character, 'user');
			} catch (error) {
				throw error;
			}
		}
		res.status(200).json(character.actions);
	} catch (error) {
		next(error);
	}
});
// GET '/:characterId/items' which will list out all items related to specific character (role: user, admin)
router.get('/:characterId', requireToken, async (req, res, next) => {
	try {
		const character = await Character.findById(req.params.characterId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateOwnership(req, character, 'user');
			} catch (error) {
				throw error;
			}
		}
		res.status(200).json(character.items);
	} catch (error) {
		next(error);
	}
});
// POST '/' which will add a new character and return it
router.post('/', requireToken, async (req, res, next) => {
	try {
		const character = await Character.create({
			user: req.user._id,
			name: req.body.name,
			image: req.body.image,
			model: req.body.model,
			// actions: defaultActions(),
			actions: [],
			stats: req.body.stats,
		});
		res.status(201).json(character);
	} catch (error) {
		next(error);
	}
});
// PATCH `/:characterId` which will update a character and return it (role: admin Stretch goal: role: user)
router.patch('/:characterId', requireToken, async (req, res, next) => {
	try {
		const character = await Character.findById(req.params.characterId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateOwnership(req, character, 'user');
			} catch (error) {
				throw error;
			}
		}
		let query = { $set: {} };
		for (let key in req.body) {
			if (character[key] && character[key] !== req.body[key])
				// if the field we have in req.body exists, we're gonna update it
				query.$set[key] = req.body[key];
		}
		const updatedCharacter = await Character.findByIdAndUpdate(
			req.params.characterId,
			query,
			{
				new: true,
			}
		);
		res.status(200).json(updatedCharacter);
	} catch (error) {
		next(error);
	}
});
// DELETE `/:characterId` which will delete a character and return list of all characters (role: admin; Stretch goal: role: user)
router.delete('/:characterId', requireToken, async (req, res, next) => {
	try {
		const character = await Character.findById(req.params.characterId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateOwnership(req, character, 'user');
			} catch (error) {
				throw error;
			}
		}
		await Character.findByIdAndDelete(req.params.characterId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
