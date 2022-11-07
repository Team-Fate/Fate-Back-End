const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Item = require('../models/Item');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/items/
router.get('/', requireToken, (req, res, next) => {
	Item.find({})
		.then((item) => res.json(item))
		.catch(next);
});

router.get('/:itemId', requireToken, (req, res, next) => {
	const itemId = req.params.id;
	Item.findById(itemId)
		.then((item) => res.json(item))
		.catch(next);
});

router.post('/', requireToken, (req, res, next) => {
	const itemData = req.body;
	Item.create(itemData)
		.then((item) => res.status(201).json(item))
		.catch(next);
});

router.patch('/:itemId', requireToken, (req, res, next) => {
	const itemId = req.params.id;
	const itemData = req.body;
	Item.findOneAndUpdate({ _id: itemId }, itemData, { new: true })
		.then((item) => res.json(item))
		.catch(next);
});

router.delete('/:itemId', requireToken, (req, res, next) => {
	const itemId = req.params.id;
	Item.findOneAndDelete({ _id: itemId })
		.then((item) => res.json(item))
		.catch(next);
});
module.exports = router;
