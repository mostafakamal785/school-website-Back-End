import express from "express";
import { uploadHandler } from "../middlewares/uploadMiddleware.js";
import { uploadFiles } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadHandler, uploadFiles);

export default router;
