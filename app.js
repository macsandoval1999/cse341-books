/* Imports */
import express from 'express';
import router from './src/router.js';



/* Initialize Express App */
const app = express();



/* Middleware */

// Parse JSON request bodies
app.use(express.json());

// Use the router for handling routes
app.use(router);

// Default route for the root path
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the CSE 341 Books API!' });
});



/* Export App */
export default app;