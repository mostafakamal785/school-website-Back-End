import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  createEnrollment,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("student", "admin"), createEnrollment);
router.get("/student/:studentId", authenticate, getEnrollmentsByStudent);
router.get("/course/:courseId", authenticate, getEnrollmentsByCourse);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteEnrollment);

export default router;
