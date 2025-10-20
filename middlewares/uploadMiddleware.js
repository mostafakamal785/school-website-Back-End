import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 🧩 Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?._id || req.body.userId;
    const studentId = req.body.studentId;

    if (!userId && !studentId) {
      return cb(new Error('userId or studentId is required'), false);
    }

    let uploadPath = '';

    if (file.fieldname === 'profilePic') {
      uploadPath = path.join('uploads', 'profiles', `user_${userId}`);
    } else if (file.fieldname === 'document') {
      uploadPath = path.join('uploads', 'students', `student_${studentId || userId}`, 'documents');
    } else {
      return cb(new Error('Invalid field name'), false);
    }

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

// 🧱 File validation rules
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['.jpg', '.jpeg', '.png'];
  const allowedDocTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === 'profilePic' && allowedImageTypes.includes(ext)) {
    cb(null, true);
  } else if (file.fieldname === 'document' && allowedDocTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// 🧮 File size limits per field
const limits = {
  fileSize: 5 * 1024 * 1024, // Default: 5 MB
};

// ⚙️ Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits,
});

// ✅ Export configured upload middleware
export default upload;
