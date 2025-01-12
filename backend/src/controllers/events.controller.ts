import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CustomRequest } from "../middleware/isAuth";

type EventBody = {
  eventName: string;
  date: string;
  location: string;
  maxAttendees: string;
  createdBy: string;
};

type CreatedEvents = {
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

  const preparedEvents: EventBody & CreatedEvents = {
    ...event,
    creatorId: new ObjectId(user.userId),
    bookings: [],
  };

  const events = res.json({ message: "Hello world" });
}
