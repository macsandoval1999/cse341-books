/* Imports */
import express from "express";
import { getAllBooksHandler } from "./controllers/books.js";



/* Initialize Router */
const router = express.Router();



/* Routes */
router.get("/books", getAllBooksHandler);



/* Exports */
export default router;