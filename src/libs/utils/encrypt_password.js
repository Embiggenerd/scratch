const { hash } = require('bcrypt');

module.exports = async (password, saltRounds) =>
  await hash(password, saltRounds);
