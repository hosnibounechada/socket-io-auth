import { Server, Socket } from "socket.io";
import { EVENTS } from "../types";
import { addUser, getUsers, removeUser, friends } from "../utils/user";

export const registerAuthHandler = (io: Server, socket: Socket) => {
  // socket connection will be dropped/closed by the server in case user try to alter it.
  // will be changed if found better solution
  const userId = socket.handshake.headers.user as string;

  console.log("user :", userId, " / socket ID :", socket.id, " / has connected");

  const userJoin = () => {
    socket.join(userId);
    // get friends from Redis instead of memory
    socket.join(friends[userId]);
    // will be removed and store connection status in Redis instead
    addUser({ userId: userId, socketId: socket.id });
    // send proper status notification.
    const notification = { id: userId, status: true };
    // broadcast the event to all subscribers
    socket.to(userId).emit("statusNotification", notification);
    //only for debugging purposes
    console.log(getUsers());
  };

  const userLeave = () => {
    console.log("user :", userId, " / socket ID :", socket.id, " / has been disconnected");
    // will be removed later
    removeUser(socket.id);

    socket.leave(userId);
    // will be updated to proper notification
    const notification = { id: userId, status: false };
    // broadcast the event to all subscribers
    socket.to(userId).emit("statusNotification", notification);
    // for debugging purposes
    console.log(getUsers());
  };

  userJoin();
  socket.on(EVENTS.DISCONNECT, userLeave);
};
