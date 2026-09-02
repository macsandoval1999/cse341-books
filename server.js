/* Imports */
import app from './app.js';



/* Define Port */
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error('PORT is not defined in the environment variables.');
}



/* Start Server */
app.listen(PORT, () => {
    console.log(`Server is listening at http://127.0.0.1:${PORT}`);
});