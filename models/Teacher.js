import mongoose from "mongoose";

const Teacher = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  subject: String,
  phone: String,
});

export default mongoose.model("Teacher",Teacher);
