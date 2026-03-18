const express = require('express');
const router = express.Router();
const { authAdmin, getAdminProfile, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', authAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.route('/profile').get(protect, getAdminProfile);

module.exports = router;
