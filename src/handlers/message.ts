import { Server, Socket } from "socket.io";
import { EVENTS, Message } from "../types";

export const registerMessagesHandler = (io: Server, socket: Socket) => {
  socket.on(EVENTS.MESSAGE_TO_SERVER, (message: Message) => {
    //for more security reasons we can extract the user id from socket.handshake.auth.token
    console.log("message from client", message);
    io.emit(EVENTS.MESSAGE_TO_CLIENT, message);
  });
};
