const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema();

const User = mongoose.model('User', UserSchema);
module.exports = User;
