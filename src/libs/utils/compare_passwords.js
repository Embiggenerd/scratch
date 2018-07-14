const { compare } = require('bcrypt');

module.exports = async (dbPassword, reqPassword) =>
  await compare(dbPassword, reqPassword);
