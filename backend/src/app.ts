import cors from "cors";
import express, { ErrorRequestHandler, Response } from "express";
import { connectToDatabase } from "./db/db";
import authRouter from "./routes/auth.router";

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/", (_, res: Response) => {
  res.send("Hello Xebraa Tech 💙🔥");
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
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to database, exiting app...", error);
    process.exit(1);
  }
}
startServer();
