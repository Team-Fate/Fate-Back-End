const mongoose = require('../db/connection');

const ItemSchema = new mongoose.Schema();

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
