/**
 * Course model for MongoDB using Mongoose.
 * Defines the schema for course documents in the database.
 */

// Import Mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the Course schema
const Course = new mongoose.Schema({
  title: String, // Course title
  code: { type: String, unique: true }, // Unique course code
  description: String, // Course description
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Reference to Teacher model
  maxStudents: Number, // Maximum number of students allowed
});
<<<<<<< HEAD
export default mongoose.model("Course",Course);
=======

// Export the Course model
export default mongoose.model("Course", Course);
>>>>>>> bf7be69bfe5845d570b4eced1a61152480bc3dd9
