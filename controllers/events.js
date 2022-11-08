const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Event = require('../models/Event');
const { handleValidateAuthorization } = require('../middleware/custom_errors');

// GET '/' which will list out all events (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const events = await Event.find();
		res.status(200).json(events);
	} catch (error) {
		next(error);
	}
});

// GET '/:eventId' which will list a specific event (role: user, admin)
router.get('/:eventId', requireToken, async (req, res, next) => {
	try {
		const event = Event.findById(req.params.eventId);
		res.status(200).json(event);
	} catch (error) {
		next(error);
	}
});

// POST '/' which will add a new event and return it (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const event = await Event.create(req.body);
		res.status(201).json(event);
	} catch (error) {
		next(error);
	}
});

// PATCH '/:eventId' which will update an event and return it (role: admin)
router.patch('/:eventId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const updatedEvent = Event.findByIdAndUpdate(req.params.eventId, req.body, {
			new: true,
		});
		res.status(200).json(updatedEvent);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:eventId' which will delete an event and return list of all events (role: admin)
router.delete('/:eventId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await Event.findByIdAndDelete(req.params.eventId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
