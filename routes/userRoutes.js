import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { getMe, updateMe } from '../controllers/userController.js';

const router = express.Router();

// Get current user info
router.get('/me', authenticate, getMe);

// Update name or profile picture
router.put('/me', authenticate, upload.single('profilePic'), updateMe);

export default router;
