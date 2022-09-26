import { Server, Socket } from "socket.io";
import { EVENTS, Message } from "../types";
import { messageSchema } from "../validators";
import { DataValidator } from "../services";

export const registerMessagesHandler = (io: Server, socket: Socket) => {
  socket.on(EVENTS.MESSAGE_TO_SERVER, (message: Message) => {
    //for more security reasons we can extract the user id from socket.handshake.auth.token
    if (!DataValidator.isValid(messageSchema, message)) return;

    console.log("from client", socket.handshake.headers.user, ":", message);
    io.to(message.to).emit(EVENTS.MESSAGE_TO_CLIENT, message);
    // io.emit(EVENTS.MESSAGE_TO_CLIENT, message);
  });
};
