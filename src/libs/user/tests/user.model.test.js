const mongoose = require('mongoose');
const testDB = 'mongodb://localhost/ribbit3-test';
// mongoose.connect(testDB);

const UserModel = require('../user_model');

describe('User model test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      testDB,
      () => {
        console.log('connected to test db');
      }
    );

    await UserModel.remove({});
  });

  afterEach(async () => {
    await UserModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(UserModel).toBeDefined();
  });

  describe('Get users', () => {
    const userObj = {
      username: 'iggles',
      password: 'theClown'
    };
    it('Saves a user', async () => {
      const user = new UserModel(userObj);
      const savedUser = await user.save();
      expect(savedUser).toMatchObject(userObj);
    });
    it('Gets a user', async () => {
      const user = new UserModel(userObj);
      await user.save();

      const foundUser = await UserModel.findOne(userObj);
      const expected = userObj;
      const actual = foundUser;
      expect(actual).toMatchObject(expected);
    });
    it('Updates a user', async () => {
      const user = new UserModel(userObj);
      await user.save();

      user.name = 'igor';
      const updatedUser = await user.save();
      const actual = updatedUser.name;
      const expected = 'igor';
      expect(actual).toMatch(expected);
    });
    it('Has fullName method', async () => {
      const user = new UserModel(userObj);

      const actual = user.fullName();
      const expected = `${userObj.firstName} ${userObj.lastName}`;
      expect(actual).toMatch(expected);
    });
  });

  describe('Save user', () => {});
});
