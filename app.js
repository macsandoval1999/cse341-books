/* Imports */
import express from 'express';



/* Initialize Express App */
const app = express();



/* Middleware */
app.use(express.json());



/* Routes */
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the CSE 341 Books API!' });
});



/* Export App */
export default app;