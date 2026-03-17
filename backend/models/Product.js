const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description'],
    maxlength: [200, 'Short description can not be more than 200 characters']
  },
  price: {
    type: Number,
    default: 0
  },
  fullDescription: {
    type: String,
    required: [true, 'Please add a full description']
  },
  images: {
    type: [String],
    default: []
  },
  specifications: [{
    key: String,
    value: String
  }],
  features: {
    type: [String],
    default: []
  },
  certifications: {
    type: [String],
    default: []
  },
  brochureFile: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Optimize lookups
productSchema.index({ name: 'text', shortDescription: 'text' });
productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);
