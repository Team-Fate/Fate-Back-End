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

const bcrypt = require('bcrypt');

async function cleanDb() {
	try {
		console.log('Deleting actions ...');
		await Action.deleteMany({});
		console.log('Actions deleted.');
		console.log('=====================');
		console.log('Deleting card ...');
		await Card.deleteMany({});
		console.log('Cards deleted.');
		console.log('=====================');
		console.log('Deleting characters ...');
		await Character.deleteMany({});
		console.log('Characters deleted.');
		console.log('=====================');
		console.log('Deleting events ...');
		await Event.deleteMany({});
		console.log('Events deleted.');
		console.log('=====================');
		console.log('Deleting items ...');
		await Item.deleteMany({});
		console.log('Items deleted.');
		console.log('=====================');
		console.log('Deleting npcs ...');
		await NPC.deleteMany({});
		console.log('NPCs deleted.');
		console.log('=====================');
		console.log('Deleting stories ...');
		await Story.deleteMany({});
		console.log('Stories deleted.');
		console.log('=====================');
		console.log('Deleting users ...');
		await User.deleteMany({});
		console.log('Users deleted.');
		console.log('=====================');
	} catch (error) {
		console.log(error);
	}
}

async function seedDb() {
	try {
		console.log('Seeding users ...');
		await Promise.all(
			users.map(async (user) => {
				try {
					const password = await bcrypt.hash(user.password, 10);
					const updatedUser = { ...user, password: password };
					await User.create(updatedUser);
				} catch (error) {
					console.log(error);
				}
			})
		);
		console.log('Users seeded');
		console.log('=====================');
		console.log('Seeding actions ...');
		await Action.insertMany(actions);
		console.log('Actions seeded');
		console.log('=====================');
		console.log('Seeding cards ...');
		await Card.insertMany(cards);
		console.log('Cards seeded');
		console.log('=====================');
		console.log('Seeding stories ...');
		await Promise.all(
			stories.map(async (story) => {
				const updatedCards = [];
				await Promise.all(
					story.cards.map(async (card) => {
						const dbCard = await Card.findOne({ name: card });
						updatedCards.push(dbCard._id);
					})
				);
				const updatedStory = { ...story, cards: updatedCards };
				await Story.create(updatedStory);
			})
		);
		console.log('Stories seeded');
		console.log('=====================');
		console.log('Seeding characters ...');
		await Promise.all(
			characters.map(async (character) => {
				try {
					const dbUser = await User.findOne({ username: character.user });
					const dbStory = await Story.findOne({ name: 'tutorial' });
					// const cards = [
					// 	[null, null, 'Sunglasses store'],
					// 	[null, 'Vital-supply drink', 'Rat'],
					// 	['Good morning?', 'Knife', null],
					// ];
					// await Promise.all(
					// 	cards.map(async (cardsRow) => {
					// 		const dbCardsRow = [];
					// 		await Promise.all(
					// 			cardsRow.map(async (card) => {
					// 				if (card != null) {
					// 					const dbCard = await Card.findOne({ name: card });
					// 					dbCardsRow.push(dbCard._id);
					// 				} else {
					// 					dbCardsRow.push(null);
					// 				}
					// 			})
					// 		);
					// 		dbCards.push(dbCardsRow);
					// 	})
					// );
					const dbCards = [];
					const dbCardsRow0 = [];
					const dbCardsRow1 = [];
					const dbCardsRow2 = [];
					dbCardsRow0.push(null);
					dbCardsRow0.push(null);
					const dbCardStore = await Card.findOne({ name: 'Sunglasses store' });
					dbCardsRow0.push(dbCardStore);
					dbCardsRow1.push(null);
					const dbCardPotion = await Card.findOne({
						name: 'Vital-supply drink',
					});
					dbCardsRow1.push(dbCardPotion);
					const dbCardEnemy = await Card.findOne({
						name: 'Rat',
					});
					dbCardsRow1.push(dbCardEnemy);
					const dbStart = await Card.findOne({
						name: 'Good morning?',
					});
					dbCardsRow2.push(dbStart);
					const dbWeapon = await Card.findOne({
						name: 'Knife',
					});
					dbCardsRow2.push(dbWeapon);
					dbCardsRow2.push(null);
					dbCards.push(dbCardsRow0);
					dbCards.push(dbCardsRow1);
					dbCards.push(dbCardsRow2);
					const updatedStory = {
						id: dbStory,
						tokenPosition: [2, 0],
						cardsPosition: dbCards,
					};
					const updatedCharacter = {
						...character,
						user: dbUser._id,
						story: updatedStory,
					};
					await Character.create(updatedCharacter);
				} catch (error) {
					console.log(error);
				}
			})
		);
		console.log('Characters seeded');
		console.log('=====================');
		console.log('Seeding events ...');
		await Event.insertMany(events);
		console.log('Events seeded');
		console.log('=====================');
		console.log('Seeding items ...');
		await items.map(async (item) => {
			if (item.hasOwnProperty('action')) {
				const dbAction = await Action.findOne({ name: item.action });
				const updatedItem = { ...item, action: dbAction._id };
				await Item.create(updatedItem);
			} else {
				await Item.create(item);
			}
		});
		console.log('Items seeded');
		console.log('=====================');
		console.log('Seeding npcs ...');
		await NPC.insertMany(npcs);
		console.log('Npcs seeded');
		console.log('=====================');
	} catch (error) {
		console.log(error);
	}
}

cleanDb()
	.then(seedDb)
	.finally(() => {
		process.exit();
	});
