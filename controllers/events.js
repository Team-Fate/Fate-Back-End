const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Event = require('../models/Event');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/events/
router.get('/', (req, res, next) => {
	Event.find({})
		.then((events) => res.json(events))
		.catch(next);
});

// GET (event by id)
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Event.findById(id)
		.then((events) => res.json(events))
		.catch(next);
});

// POST (create event)
router.post('/', (req, res, next) => {
	const eventData = req.body;
	Event.create(eventData)
		.then((events) => res.status(201).json(events))
		.catch(next);
});

// PATCH (update event)
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const eventData = req.body;
	Event.findOneAndUpdate({ _id: id }, eventData, { new: true })
		.then((events) => res.json(events))
		.catch(next);
});
// DELETE (event by id)
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Event.findByIdAndDelete(id)
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
