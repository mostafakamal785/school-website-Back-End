import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import authorizeRoles  from '../middlewares/authorizeRole.js';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createStudent);
router.get("/", authenticate, authorizeRoles("admin", "teacher"), getStudents);
router.get("/:id", authenticate, authorizeRoles("admin", "teacher"), getStudentById);
router.put("/:id", authenticate, authorizeRoles("admin"), updateStudent);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteStudent);

export default router;
