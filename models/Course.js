// models/Course.js
import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});


export default mongoose.model("Course", courseSchema);
