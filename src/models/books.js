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

// Get Book by ID
const getBookById = async (requested_id) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const requested_book = await booksCollection.findOne({ _id: requested_id });
    return requested_book;
}



/* Exports */
export { getAllBooks, getBookById };
    