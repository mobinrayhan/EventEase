import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/isAuth";
import { fetchUsersEvents } from "../models/uses.model";

export async function getAllEventsFromUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as CustomRequest).user;

  try {
    const events = await fetchUsersEvents(user.userId);
    res.json({ message: "Get All Users Events  Successfully!", events });
  } catch (error) {
    next(error);
  }
}
