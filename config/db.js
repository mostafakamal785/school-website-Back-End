// config/db.js
import mongoose from "mongoose";

const dbMongooseConnect = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("❌ MONGO_URI is missing from .env file");

    await mongoose.connect(uri); // 👈 كده كفاية
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default dbMongooseConnect;
