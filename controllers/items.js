const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Item = require('../models/Item');
const { handleValidateAuthorization } = require('../middleware/custom_errors');

// GET '/' which will list out all items (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const items = await Item.find();
		res.status(200).json(items);
	} catch (error) {
		next(error);
	}
});
// GET '/:itemId' which will list a specific item (role: user, admin)
router.get('/:itemId', requireToken, async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.itemId);
		res.status(200).json(item);
	} catch (error) {
		next(error);
	}
});
// POST '/' which will add a new item and return it (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const item = Item.create(req.body);
		res.status(201).json(item);
	} catch (error) {
		next(error);
	}
});
// PATCH '/:itemId' which will update an item and return it (role: admin)
router.patch('/:itemId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
			new: true,
		});
		res.status(200).json(item);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:itemId' which will delete an item and return list of all cards (role: admin)
router.delete('/:itemId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await Item.findByIdAndDelete(req.params.itemId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
