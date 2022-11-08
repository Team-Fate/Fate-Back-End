const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Card = require('../models/Card');
const { handleValidateAuthorization } = require('../middleware/custom_errors');

// GET '/' which will list out all cards (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const cards = await Card.find();
		res.status(200).json(cards);
	} catch (error) {
		next(error);
	}
});

//GET '/:cardId' which will list a specific card (role: user, admin)
router.get('/:cardId', requireToken, async (req, res, next) => {
	try {
		const card = Card.findById(req.params.cardId);
		res.status(200).json(card);
	} catch (error) {
		next(error);
	}
});

// POST '/' which will add a new card and return it (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const card = await Card.create(req.body);
		res.status(201).json(card);
	} catch (error) {
		next(error);
	}
});

// PATCH '/:cardId' which will update a card and return it (role: admin)
router.patch('/:cardId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const card = await Card.findByIdAndUpdate(req.params.cardId, req.body, {
			new: true,
		});
		res.status(200).json(updatedCharacter);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:cardId' which will delete a card and return list of all cards (role: admin)
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await Card.findByIdAndDelete(req.params.id);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
