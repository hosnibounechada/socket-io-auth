import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

interface UserPayload {
  id: string;
  email: string;
}

const authTokens = ["abc", "acb", "bac", "bca", "cab", "cba"];

export const authenticationMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.auth.token;
  try {
    // const { id } = jwt.verify(socket.handshake.auth.token, process.env.JWT_KEY!) as UserPayload;
    // socket.handshake.headers.user = id;

    // for test reasons
    if (!authTokens.includes(token)) return next(new Error("not authorized"));
    socket.handshake.headers.user = socket.handshake.auth.token;
  } catch {
    return next(new Error("not authorized"));
  }
  next();
};
