const mongoose = require('../db/connection');

const CharacterSchema = new mongoose.Schema();

const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
