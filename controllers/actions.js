const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Action = require('../models/Action');
const { handleValidateAuthorization } = require('../middleware/custom_errors');

// GET '/' which will list out all actions (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const actions = await Action.find();
		res.status(200).json(actions);
	} catch (error) {
		next(error);
	}
});
// GET '/:actionId' which will list a specific action (role: user, admin)
router.get('/:actionId', requireToken, async (req, res, next) => {
	try {
		const action = await Action.findById(req.params.actionId);
		res.status(200).json(action);
	} catch (error) {
		next(error);
	}
});
// POST '/' which will add a new action and return it (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const action = await Action.create(req.body);
		res.status(201).json(action);
	} catch (error) {
		next(error);
	}
});
// PATCH '/:actionId' which will update an action and return it (role: admin)
router.patch('/:actionId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const updatedAction = Action.findOneAndUpdate(
			{ _id: req.params.actionId },
			req.body,
			{
				new: true,
			}
		);
		res.status(200).json(updatedAction);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:actionId' which will delete an action and return list of all actions (role: admin)
router.delete('/:actionId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await Action.findByIdAndDelete(req.params.actionId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
