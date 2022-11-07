const mongoose = require('../db/connection');

const NPCSchema = new mongoose.Schema();

const NPC = mongoose.model('NPC', NPCSchema);
module.exports = NPC;
