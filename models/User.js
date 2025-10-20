import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  emial: String,
  passwordHash: String,
  role: { type: String, enum: ["admin", "teacher", "student"] },
  profilePic: String,
});

export default User;
