const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'equipment-products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });

// Upload route
router.post('/', upload.single('image'), (req, res) => {
  res.json({
    imageUrl: req.file.path, // 🔥 Cloudinary URL
  });
});

module.exports = router;