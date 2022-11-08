const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Card = require('../models/Card');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/cards/
router.get('/', requireToken, (req, res, next) => {
	Card.find({})
		.then((cards) => res.json(cards))
		.catch(next);
});

// GET card by ID

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Card.findById(id)
		.then((cards) => res.json(cards))
		.catch(next);
});

// POST card

router.post('/', (req, res, next) => {
	const cardData = req.body;
	Card.create(cardData)
		.then((cards) => res.status(201).json(cards))
		.catch(next);
});

// Edit/Patch card
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const cardData = req.body;
	Card.findOneAndUpdate({ _id: id }, cardData, { new: true })
		.then((cards) => res.json(cards))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Card.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
