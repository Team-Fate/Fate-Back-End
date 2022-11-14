const mongoose = require('../db/connection');

const NPCSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	model: String,
	stats: {
		S: Number,
		D: Number,
		C: Number,
		I: Number,
	},
	actions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Action',
		},
	],
});

const NPC = mongoose.model('NPC', NPCSchema);
module.exports = NPC;
