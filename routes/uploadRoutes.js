import express from "express";
import { uploadHandler } from "../middlewares/uploadMiddleware.js";
import { uploadFiles } from "../controllers/uploadController.js";
import authenticate from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",authenticate, uploadHandler, uploadFiles);

export default router;
