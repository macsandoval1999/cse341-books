/* Imports */
import express from 'express';
import { getDb } from './src/db/connect.js';



/* Initialize Express App */
const app = express();



/* Middleware */
app.use(express.json());



/* Routes */
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the CSE 341 Books API!' });
});

app.get('/trails', async (req, res) => {
    try {
        const allTrails = await getDb().collection('trails').find().toArray();
        return res.status(200).json({ All_Trails: allTrails });
    } catch (error) {
        console.error('Error fetching trails:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



/* Export App */
export default app;