const AdminUser = require('../models/AdminUser');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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

// @desc    Forgot Password - Generate & Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('Please provide an email');
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      res.status(404);
      throw new Error('Admin user not found');
    }

    // 🔒 Rate limiting (3 requests per 5 min)
    if (admin.otpLockUntil && admin.otpLockUntil > Date.now()) {
      return res.status(429).json({ message: "Wait before requesting new OTP" });
    }

    if (admin.otpRequestCount >= 3) {
      admin.otpLockUntil = Date.now() + 5 * 60 * 1000;
      admin.otpRequestCount = 0;
      await admin.save();
      return res.status(429).json({ message: "Too many requests. Try later." });
    }

    admin.otpRequestCount += 1;

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔐 Hash OTP
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    admin.resetOtp = hashedOtp;
    admin.resetOtpExpiry = Date.now() + 10 * 60 * 1000;

    await admin.save();

    // 🧪 Console fallback (keep this always)
    console.log("\n============================");
    console.log(`🔑 OTP for ${email}: ${otp}`);
    console.log("============================\n");

    // 📧 Send Email via Resend
    try {
      await sendEmail({
        to: email,
        subject: "MAALAVYA Admin - Password Reset OTP",
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
      });
    } catch (err) {
      console.error("Email failed, check API key:", err.message);
    }

    res.status(200).json({ message: 'OTP sent successfully to email' });

  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      res.status(400);
      throw new Error('Please provide email, OTP, and new password');
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password too weak" });
    }

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      res.status(404);
      throw new Error('Admin user not found');
    }

    if (!admin.resetOtp || !admin.resetOtpExpiry) {
      res.status(400);
      throw new Error('OTP not requested');
    }

    // 🔐 Verify OTP
    const hashedEnteredOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedEnteredOtp !== admin.resetOtp) {
      res.status(400);
      throw new Error('Invalid OTP');
    }

    if (Date.now() > admin.resetOtpExpiry) {
      res.status(400);
      throw new Error('OTP has expired');
    }

    // ✅ Reset password
    admin.password = newPassword;
    admin.resetOtp = undefined;
    admin.resetOtpExpiry = undefined;
    admin.otpRequestCount = 0;
    admin.otpLockUntil = undefined;

    await admin.save();

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  authAdmin,
  getAdminProfile,
  forgotPassword,
  resetPassword,
};