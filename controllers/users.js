const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { requireToken, createUserToken } = require('../middleware/auth');
const User = require('../models/User');
const {
	handleValidateAuthorization,
	handleValidateUser,
} = require('../middleware/custom_errors');

// GET '/' which will list out all users (role: admin)
router.get('/', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});
// GET '/:userId' which will list a specific user (role: admin)
router.get('/:userId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		const user = await User.findById(req.params.userId);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

// POST `/signup` which will add a new user and return it (role: user)
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			username: req.body.username,
			password: password,
			role: req.body.role || 'user',
		});
		return res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
});
// POST `/signin` which will sign in the user and return a token (role: user, admin)
router.post('/signin', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const token = createUserToken(req, user);
		res.status(200).json({ token, username: user.username, userId: user._id });
	} catch (error) {
		return next(error);
	}
});
// PATCH `/:userId` which will update a user and return it (role: user (user can edit only his own data), admin)
router.patch('/:userId', requireToken, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		try {
			handleValidateAuthorization(req, 'admin');
		} catch (error) {
			try {
				handleValidateUser(req, user);
			} catch (error) {
				throw error;
			}
		}
		let query = { $set: {} };
		for (let key in req.body) {
			if (user[key] && user[key] !== req.body[key])
				// if the field we have in req.body exists, we're gonna update it
				query.$set[key] = req.body[key];
		}
		const updatedUser = await User.findByIdAndUpdate(req.params.userId, query, {
			new: true,
		});
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
});

// DELETE `/:userId` which will delete a user and return a list of all users (role: admin)
router.delete('/:userId', requireToken, async (req, res, next) => {
	try {
		handleValidateAuthorization(req, 'admin');
		await User.findByIdAndDelete(req.params.userId);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
