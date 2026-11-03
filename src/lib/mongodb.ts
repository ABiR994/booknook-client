import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local file.");
}

// Reuse one client in development so hot reloads do not open new connections.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export const mongoClient = globalForMongo._mongoClient ?? new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = mongoClient;
}

export const db = mongoClient.db(process.env.MONGODB_DB || "booknook");
