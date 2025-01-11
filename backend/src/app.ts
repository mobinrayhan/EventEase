import express, { ErrorRequestHandler, Response } from "express";
import authRouter from "./routes/auth.router";

const app = express();
const PORT = process.env.PORT || 3002;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
