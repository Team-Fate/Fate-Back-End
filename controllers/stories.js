const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Story = require('../models/Story');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET '/' which will list out all stories (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const stories = await Story.find();
		res.status(200).json(stories);
	} catch (error) {
		next(error);
	}
});

// GET '/:storyId' which will list a specific story (role: user, admin)
router.get('/:storyId', requireToken, async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.storyId);
		res.status(200).json(story);
	} catch (error) {
		next(error);
	}
});

// POST '/' which will add a new story and return list of all stories (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const story = await Story.create(req.body);
		res.status(201).json(story);
	} catch (error) {
		next(error);
	}
});

// PATCH '/:storyId' which will update a story and return list of all stories (role: admin)
router.patch('/:storyId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const story = Story.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(story);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:storyId' which will delete a story and return list of all stories (role: admin)
router.delete('/:storyId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await Story.findByIdAndDelete(req.params.id);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
