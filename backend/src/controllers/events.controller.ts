import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CustomRequest } from "../middleware/isAuth";
import { createEvent } from "../models/events.model";

export type EventBody = {
  eventName: string;
  date: string;
  location: string;
  maxAttendees: string;
  createdBy: string;
};

export type CreatedEvents = {
  creatorId: ObjectId;
  bookings: Array<ObjectId>;
} & EventBody;

export async function createNewEvent(
  req: Request<{}, {}, EventBody>,
  res: Response,
  next: NextFunction
) {
  const event = req.body;
  const user = (req as CustomRequest).user;

  try {
    const preparedEvents: EventBody & CreatedEvents = {
      ...event,
      creatorId: new ObjectId(user.userId),
      bookings: [],
    };
    await createEvent(preparedEvents);
    res.json({ message: "Event Created Successfully!" });
  } catch (error) {
    next(error);
  }
}
