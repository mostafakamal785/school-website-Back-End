import express from 'express';

import path from 'path';
import fs from 'fs';

import errorHandler from './middlewares/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';

import authRoutes from './routes/authRoutes.js';


import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const accessHistory = fs.createWriteStream(path.resolve('logs', 'requests.log'), { flags: 'a' });

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined', { stream: accessHistory }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use("/api/upload", uploadRoutes);


app.use(errorHandler);
export default app;
