import cors from "cors";
import express, { ErrorRequestHandler, Response } from "express";
import { connectToDatabase } from "./db/db";

import authRouter from "./routes/auth.router";
import eventRouter from "./routes/events.route";
import usersRouter from "./routes/users.router";
import { init } from "./util/socket";

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/users", usersRouter);

app.use("/", (_, res: Response) => {
  res.json({ message: "Hello Xebraa Tech 💙🔥" });
});

export type RequestError = {
  message: string;
  statusCode?: number;
};

const errorMiddleware: ErrorRequestHandler = (
  err: RequestError,
  _,
  res,
  _2
) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "Something Went Wrong" });
};
app.use(errorMiddleware);

async function startServer() {
  try {
    await connectToDatabase();
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const io = init(server);

    const userSocketMap = new Map();

    // Attach `io` and `userSocketMap` to `app` for global access
    app.set("io", io);
    app.set("userSocketMap", userSocketMap);

    io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;

      if (userId) {
        userSocketMap.set(userId, socket.id);
        console.log(`User connected: ${userId} -> ${socket.id}`);
      }

      socket.on("disconnect", () => {
        if (userId) {
          userSocketMap.delete(userId);
          console.log(`User disconnected: ${userId}`);
        }
      });
    });
  } catch (error) {
    console.error("Could not connect to database, exiting app...", error);
    process.exit(1);
  }
}

startServer();
