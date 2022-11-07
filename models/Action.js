const mongoose = require('../db/connection');

const ActionSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        type: String
    }
);

const Action = mongoose.model('Action', ActionSchema);
module.exports = Action;