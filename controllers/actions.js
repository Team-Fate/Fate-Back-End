const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Action = require('../models/Action');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/actions/
router.get('/', (req, res, next) => {
    Action.find({})
    .then((action) => res.json(action))
    .catch(next);
});

router.get('/:Id', (req, res, next) => {
    const Id = req.params.Id;
	Action.findById(Id)
		.then((action) => res.json(action))
		.catch(next);
});

router.post('/', (req, res, next) => {
    const actionData = req.body;
	Action.create(actionData)
		.then((action) => res.status(201).json(action))
		.catch(next);
});

router.patch('/:actionId', (req, res, next) => {
    const actionId = req.params.actionId;
    const actionData = req.body;
	Action.findOneAndUpdate({ _id : actionId }, actionData, { new: true })
		.then((action) => res.json(action))
		.catch(next);
});

router.delete('/:actionId', (req, res, next) => {
    const actionId = req.params.actionId;
	Action.findOneAndDelete({ _id: actionId})
		.then((action) => res.json(action))
		.catch(next);
});

module.exports = router;
