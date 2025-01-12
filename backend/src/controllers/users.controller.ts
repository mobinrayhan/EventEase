import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { RequestError } from "../app";
import { CustomRequest } from "../middleware/isAuth";
import { getEvent, registerEvent } from "../models/events.model";
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

type BookNewEvent = {
  eventName: string;
  eventId: string;
  email: string;
  name: string;
};

export async function registerForEvents(
  req: Request<{}, {}, BookNewEvent>,
  res: Response,
  next: NextFunction
) {
  const userInput = req.body;
  const user = (req as CustomRequest).user;

  try {
    const existedEvent = await getEvent(userInput.eventId);
    if (!existedEvent) {
      const err: RequestError = new Error("No Event Found!");
      err.statusCode = 404;
      throw err;
    }

    const updatedEvent = await registerEvent({
      eveCret: {
        createdFrom: new ObjectId(user.userId),
        email: userInput.email,
        name: userInput.name,
      },
      id: userInput.eventId,
    });
    res.json({
      message: "Register Event Successfully!",
    });
  } catch (error) {
    next(error);
  }
}
