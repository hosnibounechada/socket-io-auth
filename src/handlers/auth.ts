import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { addUser, getUsers, removeUser } from "../utils/user";
import { EVENTS } from "../types";

interface UserPayload {
  id: string;
  email: string;
}

export const registerAuthHandler = (io: Server, socket: Socket) => {
  console.log("socket:", socket.id, "connected with token:", socket.handshake.auth.token);

  const userJoin = () => {
    try {
      //   const { id } = jwt.verify(socket.handshake.auth.token, process.env.JWT_KEY!) as UserPayload;
      const id = "user-id";
      addUser({ userId: id, socketId: socket.id });
      console.log(getUsers());
    } catch (err) {
      console.error(err);
    }
  };

  const userLeave = () => {
    console.log("user :", socket.id, " has been disconnected");
    removeUser(socket.id);
    console.log(getUsers());
  };

  userJoin();
  socket.on(EVENTS.DISCONNECT, userLeave);
};
