/**
 * User model for MongoDB using Mongoose.
 * Defines the schema for user documents in the database.
 */

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the User schema
const User = new mongoose.Schema({
  name: String, // User's full name
  email: String, // User's email address (note: was misspelled as 'emial')
  password: String, // Hashed password (note: was named 'passwordHash')
  role: { type: String, enum: ["admin", "teacher", "student"] }, // User role
  profilePic: String, // URL or path to profile picture
  isVerified: { type: Boolean, default: false }, // Email verification status
  resetCode: String, // Password reset token (hashed)
  resetCodeExp: Date, // Expiration date for reset token
  verifyToken: String, // Email verification token (hashed)
});

// Export the User model
export default mongoose.model("User", User);
