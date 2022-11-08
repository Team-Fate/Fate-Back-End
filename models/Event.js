const mongoose = require('../db/connection');

const EventSchema = new mongoose.Schema({
	name: String,
	description: String,
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
