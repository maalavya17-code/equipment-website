const express = require('express');
const router = express.Router();
const multer = require('multer');

// simple memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔥 THIS IS THE ROUTE YOU ARE MISSING
router.post('/image', upload.single('image'), (req, res) => {
  console.log("UPLOAD HIT"); // debug

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // return fake image URL (temporary)
  res.json({
    filePaths: ['https://dummyimage.com/400x300/000/fff']
  });
});

module.exports = router;