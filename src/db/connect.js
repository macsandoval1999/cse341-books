/* Imports */
import { MongoClient } from "mongodb";



/* Declare database variable to hold the MongoDB connection */
let database;



/* Database Connection Functions */

/*  Connects to MongoDB using the URI stored in the MONGODB_URI environment variable.
    It validates that the URI exists, creates a MongoDB client, opens the connection, selects the database named by MONGODB_DB_NAME, and stores that database reference in the module-level database variable so other parts of the application can reuse it.
    When no database name is provided, it uses "practice" as the default database name.
    The function returns the connected database object and throws an error if the URI is missing or MongoDB cannot be reached. */
const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI;
    if (!connectionString) {
        throw new Error("MONGODB_URI is required.");
    }

    const client = new MongoClient(connectionString);
    await client.connect();
    database = client.db(process.env.MONGODB_DB_NAME);
    return database;
};

/*  Returns the MongoDB database connection created by connectToDb.
    This function prevents the rest of the application from trying to use the database before the connection has been initialized. If connectToDb has not completed yet, it throws an error instructing the caller to initialize the database first. */
const getDb = () => {
    if (!database) {
        throw new Error("Database not initialized. Call connectToDb first.");
    }
    return database;
};



/* Exports */
export { connectToDb, getDb };
