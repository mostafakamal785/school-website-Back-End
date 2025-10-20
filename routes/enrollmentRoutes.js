import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import  authorizeRoles  from '../middlewares/authorizeRole.js';
import {
  createEnrollment,
  getStudentEnrollments,
  getCourseEnrollments,
  deleteEnrollment,
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.post("/", authenticate, authorizeRoles("student", "admin"), createEnrollment);
router.get('/student/:studentId', authenticate, getStudentEnrollments);
router.get('/course/:courseId', authenticate, getCourseEnrollments);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteEnrollment);

export default router;
