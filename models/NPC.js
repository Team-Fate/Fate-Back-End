const mongoose = require('../db/connection');

const NPCSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	model: String,
	stats: {
		S: Int,
		D: Int,
		C: Int,
		I: Int,
	},
});

const NPC = mongoose.model('NPC', NPCSchema);
module.exports = NPC;
