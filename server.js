/**
 * Server entry point for the school website backend.
 * Sets up environment variables, database connection, and starts the Express server.
 */

// Import required modules
import app from './app.js'; // Main Express application
import dotenv from 'dotenv'; // Environment variable loader
import dbMongooseConect from './config/db.js'; // Database connection function

// Load environment variables from .env file
dotenv.config();

// Get configuration from environment variables
const PORT = process.env.PORT; // Server port

// Connect to MongoDB database
dbMongooseConect();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
