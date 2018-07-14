const encryptPassword = require('../utils/encrypt_password');
const comparePasswords = require('../utils/compare_passwords');
const countUsers = require('../utils/count_users');
const findUser = require('../utils/find_user');

module.exports = {
  countUsers,
  comparePasswords,
  encryptPassword,
  findUser
};
