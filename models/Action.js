const mongoose = require('../db/connection');

const ActionSchema = new mongoose.Schema();

const Action = mongoose.model('Action', ActionSchema);
module.exports = Action;