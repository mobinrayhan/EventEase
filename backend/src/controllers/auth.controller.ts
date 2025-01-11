import { NextFunction, Request, Response } from "express";

export function registrationUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send("Hello worldxxxxxx");
}

export function loginUser(req: Request, res: Response, next: NextFunction) {
  res.send("Loggin user successfully");
}
