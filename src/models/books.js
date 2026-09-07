/* Imports */
import { getDb } from "../db/connect.js";



/* Book Model Functions */

// Get All Books
const getAllBooks = async () => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const books = await booksCollection.find({}).toArray();
    return books;
};



/* Exports */
export { getAllBooks };
