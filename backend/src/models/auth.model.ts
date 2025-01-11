import { RegistrationBody } from "../controllers/auth.controller";
import { connectToDatabase } from "../db/db";

export async function createUser(user: RegistrationBody) {
  const db = await connectToDatabase();
  const collection = db.collection("users");
  return collection.insertOne(user);
}
