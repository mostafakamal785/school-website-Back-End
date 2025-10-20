/**
 * Main Express application setup.
 * Configures middleware, routes, and error handling for the school website backend.
 */

// Import required modules
import express from 'express';
import path from 'path';
import fs from 'fs';
import errorHandler from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Create Express application instance
const app = express();

// Configure rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Set up request logging to file
const accessHistory = fs.createWriteStream(path.resolve('logs', 'requests.log'), { flags: 'a' });

// Apply security and utility middleware
app.use(limiter); // Rate limiting
app.use(helmet()); // Security headers
app.use(cookieParser()); // Parse cookies
app.use(morgan('combined', { stream: accessHistory })); // HTTP request logging

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Apply global error handling middleware
app.use(errorHandler);
export default app;
