const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// simple memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔥 THIS IS THE ROUTE YOU ARE MISSING
router.post('/image', protect, upload.single('image'), async (req, res) => {


  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'equipment_uploads',
    });

    res.json({
      filePaths: [result.secure_url]
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;