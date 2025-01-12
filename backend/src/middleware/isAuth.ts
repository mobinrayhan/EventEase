import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestError } from "../app";

const JWT_SECRET = process.env.SECRET_KEY;

export interface CustomRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const err: RequestError = new Error("Access Denied. No token provided.");
    err.statusCode = 401;
    throw err;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      _id: string;
      email: string;
    };

    (req as CustomRequest).user = {
      userId: decoded._id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
};
