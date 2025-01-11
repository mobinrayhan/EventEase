import { Db, MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();
const environment = process.env.NODE_ENV || "production";

const MONGO_URI =
  environment === "production"
    ? `mongodb+srv://${process.env.MONGODB_PROD_USERNAME}:${process.env.MONGODB_PROD_PASSWORD}@cluster0.agdmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    : `mongodb://${process.env.MONGODB_DEV_USERNAME}:${process.env.MONGODB_DEV_PASSWORD}@localhost:27017/event_ease?authSource=admin`;

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    cachedDb = client.db();
    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
