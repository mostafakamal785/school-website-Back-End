import mongoose from "mongoose";

const Student = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  dob: String,
  class: String,
  class: String,
  documents: [String],
});

export default Student;
