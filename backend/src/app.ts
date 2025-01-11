import express, { Response } from "express";

const app = express();

const PORT = process.env.PORT || 3002;

app.use("/", (req, res: Response) => {
  res.send("Hello, World! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
