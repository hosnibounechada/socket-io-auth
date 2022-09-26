import { Server, Socket } from "socket.io";
import { EVENTS } from "../types";
import { addUser, getUsers, removeUser, friends } from "../utils/user";

export const registerAuthHandler = (io: Server, socket: Socket) => {
  const userId = socket.handshake.headers.user as string;
  console.log("user :", userId, " / socket ID :", socket.id, " / has connected");

  const userJoin = () => {
    try {
      socket.join(userId);
      socket.join(friends[userId]);

      addUser({ userId: userId, socketId: socket.id });

      const notification = { id: userId, status: true };

      socket.to(userId).emit("statusNotification", notification);

      console.log(getUsers());
    } catch (err) {
      console.error(err);
    }
  };

  const userLeave = () => {
    console.log("user :", userId, " / socket ID :", socket.id, " / has been disconnected");

    removeUser(socket.id);

    socket.leave(userId);

    const notification = { id: userId, status: false };

    socket.to(userId).emit("statusNotification", notification);

    console.log(getUsers());
  };

  userJoin();
  socket.on(EVENTS.DISCONNECT, userLeave);
};
