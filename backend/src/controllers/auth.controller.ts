import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestError } from "../app";

type LoginBody = { email: string; password: string };
type RegistrationBody = { name: string; email: string; password: string };

export async function registrationUser(
  req: Request<{}, {}, RegistrationBody>,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  const { email, name, password } = req.body;

  try {
    if (!errors.isEmpty()) {
      const error: RequestError = new Error(
        "Registration Input Validation Error"
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = { name, email, password: hashedPassword };

    console.log(user);

    res.json({ message: "User Created Successfully!" });
  } catch (error) {
    next(error);
  }
}

export function loginUser(
  req: Request<{}, {}, LoginBody>,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  const { email, password } = req.body;

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
