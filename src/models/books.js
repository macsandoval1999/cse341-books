/* Imports */
import { getDb } from "../db/connect.js";


/* Book Model CRUD Functions */

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
};

// Post Book
const postBook = async (new_book) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    await booksCollection.insertOne(new_book);
    return new_book;
};

// Patch Book by ID
const patchBookById = async (requested_id, updateData) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const result = await booksCollection.updateOne({ _id: requested_id }, { $set: updateData });
    return result;
};

// Put Book by ID
const putBookById = async (requested_id, newData) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const result = await booksCollection.replaceOne({ _id: requested_id }, newData);
    return result;
};

// Delete Book by ID
const deleteBookById = async (requested_id) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const result = await booksCollection.deleteOne({ _id: requested_id });
    return result;
};


/* Exports */
export { getAllBooks, getBookById, postBook, patchBookById, putBookById, deleteBookById };
