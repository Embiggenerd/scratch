const User = require('../../models/user');
const UserService = require('./user_service');

module.exports = UserService(User);
