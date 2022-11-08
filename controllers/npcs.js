const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const NPC = require('../models/NPC');
const { handleValidateAuthorization } = require('../middleware/custom_errors');

// GET '/' which will list out all npcs (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		const npcs = await NPC.find();
		res.status(200).json(npcs);
	} catch (error) {
		next(error);
	}
});

// GET '/:npcId' which will list a specific NPC (role: user, admin)
router.get('/:npcId', requireToken, async (req, res, next) => {
	try {
		const npc = await NPC.findById(req.params.npcId);
		res.status(200).json(npc);
	} catch (error) {
		next(error);
	}
});

// POST '/' which will add a new NPC and return it (role: admin)
router.post('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const npc = await NPC.create(req.body);
		res.status(201).json(npc);
	} catch (error) {
		next(error);
	}
});

// PATCH '/:npcId' which will update a NPC and return it (role: admin)
router.patch('/:npcId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const updatedNpc = await NPC.findByIdAndUpdate(req.params.npcId, req.body, {
			new: true,
		});
		res.status(200).json(updatedNpc);
	} catch (error) {
		next(error);
	}
});
// DELETE '/:npcId' which will delete a NPC and return list of all cards (role: admin)
router.delete('/:npcId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await NPC.findByIdAndDelete(req.params.npcId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
