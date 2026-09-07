/* Imports */
import { getAllBooks, getBookById } from "../models/books.js";



/* Books Controller Functions */

// Get All Books Handler
const getAllBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);

    } catch (error) {
        console.error("GET /books failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Book by ID Handler
const getBookByIdHandler = async (req, res) => {
    const requested_id = req.params.id;

    try {
        const requested_book = await getBookById(requested_id);
        if (!requested_book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(requested_book);

    } catch (error) {
        console.error("GET /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



/* Exports */
export { getAllBooksHandler, getBookByIdHandler };