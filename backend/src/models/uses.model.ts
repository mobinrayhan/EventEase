import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/db";

export async function fetchUsersEvents(userId: string) {
  const db = await connectToDatabase();
  const collection = db.collection("events");
  return collection
    .find({
      creatorId: new ObjectId(userId),
    })
    .toArray();
}
