const actions = require('./actions.json');
const cards = require('./cards.json');
const characters = require('./characters.json');
const events = require('./events.json');
const items = require('./items.json');
const npcs = require('./npcs.json');
const stories = require('./stories.json');
const users = require('./users.json');

const Action = require('../models/Action');
const Card = require('../models/Card');
const Character = require('../models/Character');
const Event = require('../models/Event');
const Item = require('../models/Item');
const NPC = require('../models/NPC');
const Story = require('../models/Story');
const User = require('../models/User');

Action.deleteMany({});
Card.deleteMany({});
Character.deleteMany({});
Event.deleteMany({});
Item.deleteMany({});
NPC.deleteMany({});
Story.deleteMany({});
User.deleteMany({});

User.insertMany(users);
Action.insertMany(actions);
Card.insertMany(cards);
characters.map((character) => {
	User.find({ username: character.user }).then((dbUser) => {
		const updatedCharacter = { ...character, user: dbUser._id };
		Character.create(updatedCharacter);
	});
});
Event.insertMany(events);
items.map((item) => {
	if (item.action != 'null') {
		Action.find({ name: item.action }).then((dbAction) => {
			const updatedItem = { ...item, action: dbAction._id };
			Item.create(updatedItem);
		});
	}
});
NPC.insertMany(npcs);
stories.map((story) => {
	const updatedCards = [];
	story.cards.map((card) => {
		Card.find({ name: card }).then((dbCard) => {
			updatedCards.push(dbCard._id);
		});
	});
});
