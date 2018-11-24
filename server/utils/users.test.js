const expect = require ('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '123',
      name: 'Michael Palin',
      room: 'Argument Clinic',
    }, {
      id: '124',
      name: 'John Cleese',
      room: 'Argument Clinic',
    }, {
      id: '127',
      name: 'Graham Chapman',
      room: 'Silly Sketch Squad',
    }];
  });

  it('should add new user', () => {
    var theseUsers = new Users();
    var thisUser = {
      id: '129',
      name: 'Eric Idle',
      room: 'Sir Robyn Fanclub',
    };
    var resUser = theseUsers.addUser(thisUser.id, thisUser.name, thisUser.room);
    expect(theseUsers.users).toEqual([thisUser]);
  });

  it('should remove a user', () => {
    const user = users.removeUser('124');
    expect(user.id).toBe('124');
    expect(users.users.length).toBe(1);
  });

  it('should not remove a user that does not exist', () => {
    const user = users.removeUser('724');
    expect(user).not.toBeDefined();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    const user = users.getUser('127');
    expect(user.name).toBe('Graham Chapman');
  });

  it('should not find a user that does not exist', () => {
    const user = users.getUser('404');
    expect(user).not.toBeDefined();
  });

  it('returns all users in a room', () => {
    const userList = users.getUserList('Argument Clinic');
    expect(userList).toEqual(['Michael Palin', 'John Cleese']);
  });
});
