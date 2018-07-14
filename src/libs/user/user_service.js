const {
  comparePasswords,
  encryptPassword,
  countUsers,
  findUser
} = require('../utils');
// const createUser = User => (firstName, lastName) => {
//   if (!firstName || !lastName)
//     throw new Error(`firstName: ${firstName} lastName: ${lastName}`);
//   const user = new User({ lastName, firstName });
//   return user.save();
// };

const createUser = User => async (username, password) => {
  if (!username || !password)
    throw new Error(`username: ${username} password: ${password}`);

  const user = new User({
    username,
    password: await encryptPassword(password, 2)
  });
  return user.save();
};

//const findUser = User => username => User.findOne({ username });

const userExists = User => username => {
  const userCount = countUsers(User, username);
  if (userCount > 0) return true;
  return false;
};

const passwordValid = User => reqPassword => {
  if (comparePasswords(User.password, reqPassword)) return true;
  return false;
};

const validateUser = User => (username, password) => {
  const foundUser = findUser(User, username);
  if (foundUser) {
    const isValidPassword = comparePasswords(password, foundUser.password);
    if (isValidPassword) return foundUser;
  }
};

module.exports = User => ({
  createUser: createUser(User),
  userExists: userExists(User),
  passwordValid: passwordValid(User),
  validateUser: validateUser(User)
});
