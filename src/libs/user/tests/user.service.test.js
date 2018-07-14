const UserService = require('../user_service');
const sinon = require('sinon');

describe('User service test', () => {
  it('Module is defined', () => {
    expect(UserService).toBeDefined();
  });
  describe('findUsers test', () => {
    it('Calls find on username', () => {
      let username;
      const find = function(str) {
        username = str;
      };

      const MockModel = function(data) {
        username = data.username;
        return {
          ...data,
          find
        };
      };
      // const MockModel = {
      //   find: sinon.spy()
      // };

      const userService = UserService(MockModel);
      userService.listUsers('igor');
      const expected = true;
      const actual = MockModel.find.calledOnce;
      expect(actual).toEqual(expected);
    });
  });
  describe('createUser test', () => {
    it('Creates a user', () => {
      const save = sinon.spy();
      let firstName;
      let lastName;

      const MockModel = function(data) {
        firstName = data.firstName;
        lastName = data.lastName;
        return {
          ...data,
          save
        };
      };
      const userService = UserService(MockModel);

      userService.createUser('Hithere', 'Howwedoinoverhere');
      const expected = true;
      const actual = save.calledOnce;

      expect(actual).toEqual(expected);
      expect(firstName).toEqual('Hithere');
      expect(lastName).toEqual('Howwedoinoverhere');
    });
  });
});
