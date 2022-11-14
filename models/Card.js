const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	name: String,
	description: String,
	image: String,
	type: String,
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
	},
	enemy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'NPC',
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
	},
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
