import mongoose from "mongoose";

const Grade = new mongoose.Schema({
  student: { type: ObjectId, ref: "Student" },
  course: { type: ObjectId, ref: "Course" },
  assignmentName: String,
  score: Number,
  maxScore: Number,
  givenBy: { type: ObjectId, ref: "Teacher" },
});

export default mongoose.model("Grade",Grade);
