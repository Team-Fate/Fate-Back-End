const mongoose = require('../db/connection');
const Schema = mongoose.Schema;
 
const StorySchema = new Schema({
	name: String,
	template: String,
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Story = mongoose.model('Story', StorySchema)

module.export = Story