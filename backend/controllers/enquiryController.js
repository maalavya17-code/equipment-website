const Enquiry = require('../models/Enquiry');

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, productId, message } = req.body;
    
    // Optional product reference
    const enquiryData = { name, email, phone, message };
    if (productId) enquiryData.productId = productId;

    const enquiry = await Enquiry.create(enquiryData);
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).populate('productId', 'name slug');
    res.json(enquiries);
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = req.body.status || enquiry.status;
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404);
      throw new Error('Enquiry not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      await enquiry.deleteOne();
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404);
      throw new Error('Enquiry not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
