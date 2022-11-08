const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const Story = require('../models/Story');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/stories/
router.get('/', requireToken, (req, res, next) => {
	Story.find({})
		.then((stories) => res.json(stories))
		.catch(next);
});

// GET STORIES BY ID
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Story.findById(id)
		.then((stories) => res.json(stories))
		.catch(next);
});

// POST story
router.post('/', (req, res, next) => {
	const storyData = req.body;
	Story.create(storyData)
		.then((stories) => res.status(201).json(stories))
		.catch(next);
});

// EDIT/PATCH STORY
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const storyData = req.body;
	Story.findOneAndUpdate({ _id: id }, storyData, { new: true })
		.then((stories) => res.json(stories))
		.catch(next);
});
// DELETE Story
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Story.findOneAndDelete({ _id: id })
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
