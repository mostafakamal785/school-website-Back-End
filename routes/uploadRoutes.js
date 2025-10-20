import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📸 Profile picture upload
router.post(
  "/profile",
  authenticate,
  upload.single("profilePic"),
  (req, res) => {
    res.json({
      success: true,
      message: "Profile picture uploaded successfully",
      file: req.file,
    });
  }
);

// 📄 Multiple documents upload
router.post(
  "/documents",
  authenticate,
  upload.array("document", 5),
  (req, res) => {
    res.json({
      success: true,
      message: "Documents uploaded successfully",
      files: req.files,
    });
  }
);

export default router;
