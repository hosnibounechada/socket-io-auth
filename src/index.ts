import { Server, Socket } from "socket.io";
import { authenticationMiddleware } from "./middleware";
import { EVENTS } from "./types";
import { registerMessagesHandler } from "./handlers";
import { registerAuthHandler } from "./handlers/auth";

const init = (io: Server) => {
  io.use(authenticationMiddleware);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    registerAuthHandler(io, socket);
    registerMessagesHandler(io, socket);
  });
};

export default init;
