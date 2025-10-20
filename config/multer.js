import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId || req.params.userId;
    const studentId = req.body.studentId || req.params.studentId;

    if (!userId && !studentId) {
      return cb(new Error("userId or studentId is required"), false);
    }

    let uploadPath;

    // 👤 If it's a profile picture → uploads/profiles/user_<userId>/
    if (file.fieldname === "profilePic" && userId) {
      uploadPath = path.join("uploads", "profiles", `user_${userId}`);
    }

    // 🎓 If it's a student document → uploads/students/student_<studentId>/documents/
    else if (file.fieldname === "document" && studentId) {
      uploadPath = path.join("uploads", "students", `student_${studentId}`, "documents");
    }

    else {
      return cb(new Error("Invalid field or missing ID"), false);
    }

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  // 🧾 file naming
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

// ✅ File type filter
const fileFilter = (req, file, cb) => {
  const allowedProfileTypes = [".jpg", ".jpeg", ".png"];
  const allowedDocTypes = [".pdf", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "profilePic" && allowedProfileTypes.includes(ext)) {
    cb(null, true);
  } else if (file.fieldname === "document" && allowedDocTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// ⚙️ Create multer instance with size limits
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // default 5 MB
  },
});

export default upload;
