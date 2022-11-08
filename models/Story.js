const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
	name: String,
	template: String,
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
