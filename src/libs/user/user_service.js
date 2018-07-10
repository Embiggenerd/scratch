const createUser = User => (firstName, lastName) => {
  if (!firstName || !lastName)
    throw new Error(`firstName: ${firstName} lastName: ${lastName}`);
  const user = new User({ lastName, firstName });
  return user.save();
};

const listUsers = User => () => {
  return User.find({});
};

module.exports = User => ({
  createUser: createUser(User),
  listUsers: listUsers(User)
});
