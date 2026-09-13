/* Imports */
import {
    getAllBooks,
    getBookById,
    postBook,
    patchBookById,
    putBookById,
    deleteBookById,
} from "../models/books.js";


/* Books Controller Functions */

// Get All Books Handler
const getAllBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        console.error("GET /books failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Book by ID Handler
const getBookByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const requested_book = await getBookById(requested_id);
        if (!requested_book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book retrieved successfully", book: requested_book });
    } catch (error) {
        console.error("GET /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Post Book Handler
const postBookHandler = async (req, res) => {
    try {
        const { id, title, authorId, publicationDate } = req.body;
        if (!id || !title || !authorId || !publicationDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existing_book = await getBookById(id);
        if (existing_book) {
            return res.status(409).json({ message: "Book id already exists" });
        }
        const new_book = await postBook({ _id: id, title, authorId, publicationDate });
        return res.status(201).json({ message: "Book created successfully", book: new_book });
    } catch (error) {
        console.error("POST /books failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Patch Book by ID Handler
const patchBookByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const updateData = req.body;
        const result = await patchBookById(requested_id, updateData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }
        const updatedBook = await getBookById(requested_id);
        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
        });
    } catch (error) {
        console.error("PATCH /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Put Book by ID Handler
const putBookByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const { title, authorId, publicationDate } = req.body;
        if (!title || !authorId || !publicationDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existing_book = await getBookById(requested_id);
        if (!existing_book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await putBookById(requested_id, { _id: requested_id, title, authorId, publicationDate });
        return res.status(200).json({ message: "Book updated successfully", book: await getBookById(requested_id) });
    } catch (error) {
        console.error("PUT /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Book by ID Handler
const deleteBookByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const existing_book = await getBookById(requested_id);
        if (!existing_book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await deleteBookById(requested_id);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("DELETE /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


/* Exports */
export {
    getAllBooksHandler,
    getBookByIdHandler,
    postBookHandler,
    patchBookByIdHandler,
    putBookByIdHandler,
    deleteBookByIdHandler,
};
