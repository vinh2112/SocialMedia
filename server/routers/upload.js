import express from "express";
import cloudinary from "../services/cloudinary.js";
import fs from "fs";

const router = express.Router();

router.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No file were uploaded" });

    const file = req.files.image;
    if (file.size > 5120 * 5120) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "Format is incorret" });
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "Image" }, async (err, result) => {
      if (err) throw err;

      removeTemp(file.tempFilePath);
      res.json({ public_id: result.public_id, url: result.secure_url });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post("/delete", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No Image Selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router;
