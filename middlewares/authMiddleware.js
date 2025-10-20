import express from "express";
import * as studentController from "../controllers/studentController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, studentController.createStudent);
router.get("/", authenticate, studentController.getStudents);
router.get("/:id", authenticate, studentController.getStudentById);
router.put("/:id", authenticate, studentController.updateStudent);
router.delete("/:id", authenticate, studentController.deleteStudent);

export default router;
