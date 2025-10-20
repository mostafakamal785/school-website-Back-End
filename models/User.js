/**
 * User model for MongoDB using Mongoose.
 * Defines the schema for user documents in the database.
 */

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the User schema
const User = new mongoose.Schema({
  name: String,
  emial: String,
  passwordHash: String,
  role: { type: String, enum: ["admin", "teacher", "student"] },
  profilePic: String,
});

export default User;
