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

export async function registerUserSocket(userId: string, socketId: string) {
  const db = await connectToDatabase();
  const collection = db.collection("userSockets");

  const result = await collection.updateOne(
    { userId },
    {
      $set: { socketId },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  return result;
}

export async function getUserSocketId(userId: string) {
  const db = await connectToDatabase();
  const collection = db.collection("userSockets");
  const userSocket = await collection.findOne({ userId });

  if (userSocket) {
    return userSocket.socketId;
  } else {
    return null;
  }
}

export async function removeUserSocket(socketId: string) {
  const db = await connectToDatabase();
  const collection = db.collection("userSockets");
  const result = await collection.deleteOne({ socketId });

  console.log(`Removed socketId: ${socketId} from user_sockets`);
  return result;
}
