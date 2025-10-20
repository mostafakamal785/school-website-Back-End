import upload from "../config/multer.js";

export const uploadHandler = (req, res, next) => {
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "document", maxCount: 5 },
  ])(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};
