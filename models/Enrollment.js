import mongoose from "mongoose";

const Enrollment = new mongoose.Schema({
  student: { type: ObjectId, ref: "Student" },
  course: { type: ObjectId, ref: "Course" },
  enrolledAt: Date,
});

export default Enrollment;
