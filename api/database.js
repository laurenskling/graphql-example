//db
class User {};
class Friend {};

// all Friends
const allFriendsList = [
  {
    id: 0,
    name: 'joop'
  },
  {
    id: 1,
    name: 'henk'
  },
  {
    id: 2,
    name: 'jan'
  },
  {
    id: 3,
    name: 'piet'
  },
  {
    id: 4,
    name: 'klaas'
  },
  {
    id: 5,
    name: 'hendrik'
  },
  {
    id: 6,
    name: 'jacob'
  },
  {
    id: 7,
    name: 'tim'
  },
  {
    id: 8,
    name: 'bas'
  },
  {
    id: 9,
    name: 'aad'
  }
];

// map all friends to the Friend class
const allFriends = allFriendsList.map(f => {
  let friend = new Friend();
  friend.id = f.id;
  friend.name = f.name;
  return friend;
});

// all the users
const usersList = [
  {
    id: 0,
    name: 'Laurens',
    friends: allFriends
  },
  {
    id: 1,
    name: 'Unkown other guy',
    friends: [ allFriends[0], allFriends[1] ]
  }
];

// map all users to the User class
const allUsers = usersList.map(u => {
  let user = new User();
  user.id = u.id;
  user.name = u.name;
  user.friends = u.friends;
  return user;
});

// fn to find a user
export const getUser = (id) => allUsers.find(user => user.id === id);
