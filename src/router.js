/* Imports */
import express from "express";
import { getAllBooksHandler, getBookByIdHandler } from "./controllers/books.js";




/* Initialize Router */
const router = express.Router();



/* Routes */
router.get("/books", getAllBooksHandler);
router.get("/books/:id", getBookByIdHandler);


/* Exports */
export default router;