/**
 * User model for MongoDB using Mongoose.
 * Clean schema after resolving merge conflict.
 */

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
    profilePic: String,
    isVerified: { type: Boolean, default: false },
    resetCode: String,
    resetCodeExp: Date,
    verifyToken: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
