// models/Student.js
import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  grade: String,
});
export default mongoose.model("Student", studentSchema);
