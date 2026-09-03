/* Imports */
import app from './app.js';
import { connectToDb } from './src/db/connect.js';



/* Define Port */
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error('PORT is not defined in the environment variables.');
}



/* Start Server */
const startServer = async () => {
    try {
        await connectToDb();
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening at http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

/* Invoke Start Server */
startServer();