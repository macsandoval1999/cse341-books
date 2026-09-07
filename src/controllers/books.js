/* Imports */
import { getAllBooks } from "../models/books.js";



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



/* Exports */
export { getAllBooksHandler };