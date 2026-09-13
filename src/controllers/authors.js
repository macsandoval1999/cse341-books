/* Imports */
import {
    getAllAuthors,
    getAuthorById,
    postAuthor,
    patchAuthorById,
    putAuthorById,
    deleteAuthorById,
    checkHasBooks
} from "../models/authors.js";



/* Authors Controller Functions */

// Get All Authors Handler
const getAllAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json({ message: "Authors retrieved successfully", authors });
    } catch (error) {
        console.error("GET /authors failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Author by ID Handler
const getAuthorByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const requested_author = await getAuthorById(requested_id);
        if (!requested_author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json({ message: "Author retrieved successfully", author: requested_author });
    } catch (error) {
        console.error("GET /authors/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Post Author Handler
const postAuthorHandler = async (req, res) => {
    try {
        const { id, name, birthYear } = req.body;
        if (!id || !name || !birthYear) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existing_author = await getAuthorById(id);
        if (existing_author) {
            return res.status(409).json({ message: "Author id already exists" });
        }
        const new_author = await postAuthor({ _id: id, name, birthYear });
        return res.status(201).json({ message: "Author created successfully", author: new_author });
    } catch (error) {
        console.error("POST /authors failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Patch Author by ID Handler
const patchAuthorByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const updateData = req.body;
        const existing_author = await getAuthorById(requested_id);
        if (!existing_author) {
            return res.status(404).json({ message: "Author not found" });
        }
        await patchAuthorById(requested_id, updateData);
        return res.status(200).json({ message: "Author updated successfully", author: await getAuthorById(requested_id) });
    } catch (error) {
        console.error("PATCH /authors/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Put Author by ID Handler
const putAuthorByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const {name, birthYear} = req.body;
        if (!name || !birthYear) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existing_author = await getAuthorById(requested_id);
        if (!existing_author) {
            return res.status(404).json({ message: "Author not found" });
        }
        await putAuthorById(requested_id, { _id: requested_id, name, birthYear });
        return res.status(200).json({ message: "Author updated successfully", author: await getAuthorById(requested_id) });
    } catch (error) {
        console.error("PUT /authors/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Author by ID Handler
const deleteAuthorByIdHandler = async (req, res) => {
    try {
        const requested_id = req.params.id;
        const existing_author = await getAuthorById(requested_id);
        if (!existing_author) {
            return res.status(404).json({ message: "Author not found" });
        }
        if (await checkHasBooks(requested_id)) {
            return res.status(409).json({ message: "Cannot delete author with associated books" });
        }
        await deleteAuthorById(requested_id);
        return res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        console.error("DELETE /authors/:id failed:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


/* Exports */
export { getAllAuthorsHandler, getAuthorByIdHandler, postAuthorHandler, patchAuthorByIdHandler, putAuthorByIdHandler, deleteAuthorByIdHandler };
