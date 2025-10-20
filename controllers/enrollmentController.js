import Enrollment from "../models/Enrollment.js";

export const createEnrollment = async (req, res) => {
  const enrollment = new Enrollment(req.body);
  await enrollment.save();
  res.status(201).json(enrollment);
};

export const getStudentEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.params.studentId }).populate("courseId");
  res.json(enrollments);
};

export const getCourseEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ courseId: req.params.courseId }).populate("studentId");
  res.json(enrollments);
};

export const deleteEnrollment = async (req, res) => {
  await Enrollment.findByIdAndDelete(req.params.id);
  res.json({ message: "Enrollment deleted" });
};
