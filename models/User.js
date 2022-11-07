const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
