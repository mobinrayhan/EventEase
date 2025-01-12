import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { RequestError } from "../app";
import { CustomRequest } from "../middleware/isAuth";
import {
  createEvent,
  deleteEventById,
  fetchAllEvents,
  getEvent,
  updateEvent,
} from "../models/events.model";
import { getIoInstance } from "../util/socket";

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
  const io = getIoInstance();

  try {
    const preparedEvent: EventBody & CreatedEvents = {
      ...event,
      creatorId: new ObjectId(user.userId),
      bookings: [],
    };
    await createEvent(preparedEvent);

    io.emit("create", {
      event: preparedEvent,
    });

    res.json({ message: "Event Created Successfully!" });
  } catch (error) {
    next(error);
  }
}

type UpdateEventBody = EventBody;

export async function updateExistingEvent(
  req: Request<{ eventId: string }, {}, UpdateEventBody>,
  res: Response,
  next: NextFunction
) {
  const event = req.body;
  const io = getIoInstance();
  const { eventId } = req.params;

  try {
    const preparedEvent: EventBody = {
      ...event,
    };
    await updateEvent({ event: preparedEvent, eventId });

    io.emit("update", {
      event: { ...preparedEvent, _id: eventId },
    });

    res.json({ message: "Event Updated Successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(
  req: Request<{ eventId: string }>,
  res: Response,
  next: NextFunction
) {
  const io = getIoInstance();
  const { eventId } = req.params;

  try {
    const deletedItem = await deleteEventById({ eventId });

    if (deletedItem.deletedCount === 1) {
      io.emit("delete", {
        deletedId: eventId,
      });

      res.json({ message: "Event Updated Successfully!" });
    } else {
      const err: RequestError = new Error("Failed To Delete Event");
      throw err;
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllEvents(
  req: Request<{}, {}, EventBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await fetchAllEvents();
    res.json({ message: "Get All Events  Successfully!", events });
  } catch (error) {
    next(error);
  }
}

export async function getEventById(
  req: Request<{ eventId: string }, {}>,
  res: Response,
  next: NextFunction
) {
  const { eventId } = req.params;
  try {
    const event = await getEvent(eventId);
    res.json({ message: "Get Event  Successfully!", event });
  } catch (error) {
    next(error);
  }
}
