/* Imports */
import { getDb } from "../db/connect.js";



/* Author Model CRUD Functions */

// Get All Authors
const getAllAuthors = async () => {
    const db = getDb();
    const authorsCollection = db.collection("authors");
    const all_authors = await authorsCollection.find({}).toArray();
    return all_authors;
};

// Get Author by ID
const getAuthorById = async (requested_id) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");
    const requested_author = await authorsCollection.findOne({ _id: requested_id });
    return requested_author;
};

// Post Author
const postAuthor = async (new_author) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");
    await authorsCollection.insertOne(new_author);
    return new_author;
}

// Patch Author by ID
const patchAuthorById = async (requested_id, updateData) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");
    const requested_author = await authorsCollection.updateOne({ _id: requested_id }, { $set: updateData });
    return requested_author;
};

// Put Author by ID
const putAuthorById = async (requested_id, newData) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");
    const requested_author = await authorsCollection.replaceOne({ _id: requested_id }, newData);
    return requested_author;
}

// Delete Author by ID
const deleteAuthorById = async (requested_id) => {
    const db = getDb(); 
    const authorsCollection = db.collection("authors");
    const result = await authorsCollection.deleteOne({ _id: requested_id });
    return result;
};



/* Author Model Helpers */

// Check if Author has Books
const checkHasBooks = async (authorId) => {
    const db = getDb();
    const booksCollection = db.collection("books");
    const booksByAuthor = await booksCollection.countDocuments({ authorId: authorId });
    return booksByAuthor > 0;
}


/* Exports */
export { getAllAuthors, getAuthorById, postAuthor, patchAuthorById, putAuthorById, deleteAuthorById, checkHasBooks };
