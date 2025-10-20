import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const updates = { name: req.body.name };
    if (req.file) {
      updates.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
