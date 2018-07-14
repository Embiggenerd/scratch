const User = require('../user/user_model');

module.exports = async (User, username) => await User.find({ username });
