// db/client.ts
import { MongoClient } from "mongodb";
import { isProduction, db } from "../../config";
import { logger } from "../logger";

let uri: string;

if (isProduction) {
  uri = `${db.productionUrl}/${db.name}?retryWrites=true&w=majority`;
} else {
  uri = `mongodb://${db.host}:${db.port}/${db.name}`;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow reuse of clientPromise in hot reload or serverless
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect().then((connectedClient) => {
    logger.info("Connected successfully to MongoDB");
    return connectedClient;
  }).catch((err) => {
    logger.error("MongoDB connection failed", err);
    throw err;
  });
}

export const mongoClientPromise = global._mongoClientPromise!;
