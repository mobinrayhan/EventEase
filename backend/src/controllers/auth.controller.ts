import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestError } from "../app";

export function registrationUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error: RequestError = new Error(
        "Registration Input Validation Error"
      );
      error.statusCode = 400;
      throw error;
    }

    res.json({ message: "Everyting is okay" });
  } catch (error) {
    next(error);
  }
}

export function loginUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error: RequestError = new Error("Login Input Validation Error");
      error.statusCode = 400;
      throw error;
    }

    res.json({ message: "Everyting is okay" });
  } catch (error) {
    next(error);
  }
}
