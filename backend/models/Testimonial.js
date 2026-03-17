const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please add a client name']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name']
  },
  review: {
    type: String,
    required: [true, 'Please add a review text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  avatar: {
    type: String,
    default: 'no-avatar.jpg'
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
