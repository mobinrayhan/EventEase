import { ObjectId } from "mongodb";
import { CreatedEvents, EventBody } from "../controllers/events.controller";
import { connectToDatabase } from "../db/db";

export async function createEvent(event: EventBody & CreatedEvents) {
  const db = await connectToDatabase();
  const collection = db.collection("events");
  return collection.insertOne(event);
}

export async function updateEvent({
  event,
  eventId,
}: {
  event: EventBody;
  eventId: string;
}) {
  const db = await connectToDatabase();
  const collection = db.collection("events");

  return collection.updateOne(
    { _id: new ObjectId(eventId) },
    { $set: { ...event } }
  );
}

export async function fetchAllEvents() {
  const db = await connectToDatabase();
  const collection = db.collection("events");
  return collection.find({}).toArray();
}

export async function getEvent(id: string) {
  const db = await connectToDatabase();
  const collection = db.collection("events");

  return collection.findOne({
    _id: new ObjectId(id),
  });
}

type Booking = {
  email: string;
  name: string;
  createdFrom: ObjectId;
};

type Event = {
  _id: ObjectId;
  createdBy: string;
  date: string;
  eventName: string;
  location: string;
  maxAttendees: string;
  creatorId: ObjectId;
  bookings: Booking[];
};

export async function registerEvent({
  eveCret,
  id,
}: {
  eveCret: Booking;
  id: string;
}) {
  const db = await connectToDatabase();
  const collection = db.collection<Event>("events");
  const newBooking = eveCret;

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        bookings: newBooking,
      },
    }
  );
}
