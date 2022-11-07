const mongoose = require('../db/connection');

const CardSchema = new mongoose.Schema();

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
