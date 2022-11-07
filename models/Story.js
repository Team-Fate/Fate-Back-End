const mongoose = require('../db/connection');

const StorySchema = new mongoose.Schema();

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
