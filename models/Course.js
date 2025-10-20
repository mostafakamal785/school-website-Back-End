import mongoose from "mongoose";

const Course = new mongoose.Schema({
  title: String,
  code: { type: String, unique: true },
  description: String,
  teacher: { type: ObjectId, ref: "Teacher" },
  maxStudents: Number,
});
export default mongoose.model("Course",Course);