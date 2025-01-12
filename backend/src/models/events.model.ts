import { CreatedEvents, EventBody } from "../controllers/events.controller";
import { connectToDatabase } from "../db/db";

export async function createEvent(event: EventBody & CreatedEvents) {
  const db = await connectToDatabase();
  const collection = db.collection("events");
  return collection.insertOne(event);
}
export async function fetchAllEvents() {
  const db = await connectToDatabase();
  const collection = db.collection("events");
  return collection.find({}).toArray();
}
