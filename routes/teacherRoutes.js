import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import authorizeRoles  from '../middlewares/authorizeRole.js';
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("admin"), createTeacher);
router.get("/", authenticate, authorizeRoles("admin"), getTeachers);
router.get("/:id", authenticate, authorizeRoles("admin"), getTeacherById);
router.put("/:id", authenticate, authorizeRoles("admin"), updateTeacher);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteTeacher);

export default router;
