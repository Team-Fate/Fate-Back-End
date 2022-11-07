const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	name: String,
	description: String,
	image: String,
	type: String,
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
