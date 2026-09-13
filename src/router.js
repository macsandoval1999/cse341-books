/* Imports */
import express from "express";
import {
    getAllBooksHandler,
    getBookByIdHandler
} from "./controllers/books.js";

import {
    getAllAuthorsHandler,
    getAuthorByIdHandler,
    postAuthorHandler,
    patchAuthorByIdHandler,
    putAuthorByIdHandler,
    deleteAuthorByIdHandler
} from "./controllers/authors.js";



/* Initialize Router */
const router = express.Router();



/* Routes */

/**
 * @openapi
 * /authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get all authors
 *     description: Returns every author in the authors collection
 *     responses:
 *       '200':
 *         description: Authors retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/authors", getAllAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get an author by ID
 *     description: Returns one author matching the requested ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the author to retrieve, such as a1
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       '200':
 *         description: Author retrieved successfully.
 *       '404':
 *         description: Author was not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/authors/:id", getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     description: Creates a new author document in the authors collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *           example:
 *             id: a3
 *             name: Mark Twain
 *             birthYear: 1835
 *     responses:
 *       '201':
 *         description: Author created successfully.
 *       '400':
 *         description: Bad request. Missing required fields.
 *       '409':
 *         description: Conflict. Author ID already exists.
 *       '500':
 *         description: Internal server error.
 */
router.post("/authors", postAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   patch:
 *     tags:
 *       - Authors
 *     summary: Update an existing author
 *     description: Updates an existing author document in the authors collection
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the author to update, such as a1
 *         schema:
 *           type: string
 *         example: a1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *           example:
 *             name: Jane Austen
 *     responses:
 *       '200':
 *         description: Author updated successfully.
 *       '404':
 *         description: Author was not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/authors/:id", patchAuthorByIdHandler);

/**
* @openapi
* /authors/{id}:
*   put:
*     tags:
*       - Authors
*     summary: Replace an existing author
*     description: Replaces an existing author document in the authors collection
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the author to replace, such as a1
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Author'
*           example:
*             name: Jane Austen
*             birthYear: 1775
*     responses:
*       '200':
*         description: Author replaced successfully.
*       '400':
*         description: Bad request. Missing required fields.
*       '404':
*         description: Author was not found.
*       '500':
*         description: Internal server error.
*/
router.put("/authors/:id", putAuthorByIdHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an existing author
 *     description: Deletes an existing author document from the authors collection
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the author to delete, such as a1
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author deleted successfully.
 *       '404':
 *         description: Author was not found.
 *       '409':
 *         description: Conflict. Cannot delete author with associated books.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/authors/:id", deleteAuthorByIdHandler);



/**
 * @openapi
 * /books:
 *  get:
 *    tags:
 *      - Books
 *   summary: Get all books
 *  description: Returns every book in the books collection
 *  responses:
 *     '200':
 *      description: Books retrieved successfully
 *    '500':
 *      description: Internal server error
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
 *     Author:
 *       description: An author object
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - birthYear
 *       properties:
 *         id:
 *           type: string
 *           example: a1
 *         name:
 *           type: string
 *           example: Jane Austen
 *         birthYear:
 *           type: integer
 *           example: 1775
 *       example:
 *         id: a1
 *         name: Jane Austen
 *         birthYear: 1775
 * 
 *     Book:
 *       description: A book object
 *       type: object
 *       required:
 *         - title
 *         - authorId
 *       properties:
 *         _id:
 *           type: string
 *           example: b1
 *         title:
 *           type: string
 *           example: Pride and Prejudice
 *         publicationDate:
 *           type: integer
 *           example: 1813
 *         authorId:
 *           type: string
 *           example: a1
 *       example:
 *         _id: b1
 *         title: Pride and Prejudice
 *         publicationDate: 1813
 *         authorId: a1
 * 
 *     Error:
 *       description: Error response
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *       example: Book not found
 */

/* Exports */
export default router;
