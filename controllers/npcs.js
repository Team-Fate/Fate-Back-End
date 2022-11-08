const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const NPC = require('../models/NPC');
const { handleValidateOwnership } = require('../middleware/custom_errors');

// GET (index) /api/npcs/
router.get('/', (req, res, next) => {
	NPC.find({})
		.then((npcs) => res.json(npcs))
		.catch(next);
});

// GET (NPC by id)
router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	NPC.findById(id)
		.then((npcs) => res.json(npcs))
		.catch(next);
});

// POST (create NPC)
router.post('/', (req, res, next) => {
	const npcData = req.body;
	NPC.create(npcData)
		.then((npcs) => res.status(201).json(npcs))
		.catch(next);
});

// PATCH (update NPC)
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const npcData = req.body;
	NPC.findOneAndUpdate({ _id: id }, npcData, { new: true })
		.then((npcs) => res.json(npcs))
		.catch(next);
});
// DELETE (NPC by id)
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	NPC.findByIdAndDelete(id)
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
