import { createServer } from "http";
import { Server } from "socket.io";

let io: Server;

export function init(server: ReturnType<typeof createServer>): Server {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  return io;
}

export function emitMessage(message: string) {
  if (io) {
    io.emit("messageBroadcast", message);
  }
}

export function getIoInstance() {
  return io;
}
