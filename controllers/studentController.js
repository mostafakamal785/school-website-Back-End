import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

export const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};
