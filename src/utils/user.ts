interface User {
  userId: string;
  socketId: string;
}

const users: User[] = [];

export function getUsers() {
  return users;
}

export function getUser(userId: string) {
  return users.find((user) => user.userId === userId);
}

export function addUser(user: User) {
  users.push(user);
}

export function removeUser(socketId: string) {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) return users.splice(index, 1)[0];
}
