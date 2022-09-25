import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import init from "./src";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use("/", express.static(path.join(__dirname, "src/public")));

init(io);

httpServer.listen(3000, () => console.log("Server started on PORT: 3000"));
