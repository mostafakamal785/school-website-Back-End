export const uploadFiles = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  res.status(200).json({
    message: "Files uploaded successfully",
    files: req.files,
  });
};
