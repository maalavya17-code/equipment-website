const express = require('express');
const router = express.Router();
const {
  getSiteContent,
  updateSiteContent,
  getExhibitions,
  createExhibition,
  deleteExhibition,
  getTestimonials,
  createTestimonial,
  deleteTestimonial
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

router.route('/').get(getSiteContent).put(protect, updateSiteContent);

router.route('/exhibitions').get(getExhibitions).post(protect, createExhibition);
router.route('/exhibitions/:id').delete(protect, deleteExhibition);

router.route('/testimonials').get(getTestimonials).post(protect, createTestimonial);
router.route('/testimonials/:id').delete(protect, deleteTestimonial);

module.exports = router;
