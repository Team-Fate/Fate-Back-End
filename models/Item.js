const mongoose = require('../db/connection');

const ItemSchema = new mongoose.Schema({
	name: String,
	description: String,
	type: String,
	stat: String,
	action: [{ type: mongoose.Schema.Types.ObjectId, rel: 'Action' }],
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
