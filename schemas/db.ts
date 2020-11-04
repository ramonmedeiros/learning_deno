import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

const databaseURL = "mongodb://localhost:27017";
const defaultDatabase = "test";

function connect() {
  // try to connect to database
  const client = new MongoClient();
  try {
    client.connectWithUri(databaseURL);
  } catch (error) {
    console.log(`Cannot connect to database at {databaseURL}`);
    Deno.exit(1);
  }

  const db = client.database(defaultDatabase);
  return db;
}

export default connect;
