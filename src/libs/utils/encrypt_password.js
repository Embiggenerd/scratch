const { hash } = require('bcrypt');

module.exports = async (password, saltRounds) => hash(password, saltRounds);
