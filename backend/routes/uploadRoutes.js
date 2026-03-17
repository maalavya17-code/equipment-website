const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// @desc    Upload product images (single/multiple)
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, upload.array('image', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const filePaths = req.files.map(file => `/uploads/product-images/${file.filename}`);
  res.json({ message: 'Images uploaded', filePath: filePaths[0], filePaths });
});

// @desc    Upload product images (multiple) or single image
// @route   POST /api/upload/image
// @access  Private/Admin
router.post('/image', protect, upload.array('image', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const filePaths = req.files.map(file => `/uploads/product-images/${file.filename}`);
  res.json({ message: 'Images uploaded', filePaths });
});

// @desc    Upload product brochure (single)
// @route   POST /api/upload/brochure
// @access  Private/Admin
router.post('/brochure', protect, upload.single('brochure'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No brochure uploaded' });
  }
  res.json({ message: 'Brochure uploaded', filePath: `/uploads/brochures/${req.file.filename}` });
});

module.exports = router;
