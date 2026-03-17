const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    default: null
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Resolved'],
    default: 'New'
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
