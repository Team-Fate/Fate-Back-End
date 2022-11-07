const mongoose = require('../db/connection');
const Schema = mongoose.Schema;
 
const StorySchema = new Schema({
    name: String,
    template: String,
    cards: [Object.Id rel: Card],
})

const Story = mongoose.model('Story', StorySchema)

module.export = Story