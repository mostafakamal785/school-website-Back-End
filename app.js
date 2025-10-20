// Import required modules
import express from 'express';
import path from 'path';
import fs from 'fs';import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

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

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

export default app;
