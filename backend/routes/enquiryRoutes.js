const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

router.route('/').post(createEnquiry).get(protect, getEnquiries);
router
  .route('/:id')
  .put(protect, updateEnquiryStatus)
  .delete(protect, deleteEnquiry);

module.exports = router;
