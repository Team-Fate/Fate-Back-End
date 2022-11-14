const mongoose = require('../db/connection');

const CharacterSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: String,
	image: String,
	model: String,
	actions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Action',
		},
	],
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
		},
	],
	stats: { S: Number, D: Number, C: Number, I: Number },
	story: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
		},
		tokenPosition: [Number],
		cardsPosition: [
			[
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Card',
				},
			],
		],
	},
	status: {
		maxHealth: Number,
		currentHealth: Number,
	},
});

const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
