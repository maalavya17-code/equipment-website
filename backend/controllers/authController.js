const AdminUser = require('../models/AdminUser');
const generateToken = require('../utils/generateToken');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const authAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private/Admin
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await AdminUser.findById(req.admin._id);
    if (admin) {
      res.json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authAdmin,
  getAdminProfile,
};
