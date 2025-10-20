import Teacher from "../models/Teacher.js";

export const createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).json(teacher);
};

export const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

export const getTeacherById = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(teacher);
};

export const updateTeacher = async (req, res) => {
  const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};
