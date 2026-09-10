/* Imports */
import express from "express";
import router from "./src/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from './swagger.json' with { type: "json" };



/* Initialize Express App */
const app = express();



/* Middleware */

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Parse JSON request bodies
app.use(express.json());

// Use the router for handling routes
app.use(router);

// Default route for the root path
app.get("/", (req, res) => {
    return res
        .status(200)
        .json({ message: "Welcome to the CSE 341 Books API!" });
});



/* Export App */
export default app;
