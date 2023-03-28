const users = [];

// Join user to chat (push user to users array)
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Get current user (get needed user from array)
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat (delete from users array)
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
