/* Imports */
import express from "express";
import { getAllBooksHandler, getBookByIdHandler } from "./controllers/books.js";

/* Initialize Router */
const router = express.Router();

/* Routes */

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Returns every book in the books collection
 *     responses:
 *       '200':
 *         description: Books retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/books", getAllBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     description: Returns one book matching the requested ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to retrieve, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book retrieved successfully.
 *       '404':
 *         description: Book was not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       description: A book document returned by the API.
 *       additionalProperties: true
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 */

/* Exports */
export default router;
