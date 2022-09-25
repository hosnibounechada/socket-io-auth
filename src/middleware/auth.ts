import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const authenticationMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.auth.token;
  console.log("i am middleware");
  // if (!authTokens.includes(token)) return next(new Error("not authorized"));
  next();
};
