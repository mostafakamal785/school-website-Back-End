import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import  authorizeRoles  from '../middlewares/authorizeRole.js';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin", "teacher"), createCourse);
router.get("/", getCourses); // public
router.get("/:id", getCourseById); // public
router.put("/:id", authenticate, authorizeRoles("admin", "teacher"), updateCourse);
router.delete("/:id", authenticate, authorizeRoles("admin", "teacher"), deleteCourse);

export default router;
