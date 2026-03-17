const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  heroSliders: [{
    image: String,
    title: String,
    subtitle: String,
    ctaText: String,
    ctaLink: String
  }],
  aboutText: {
    type: String,
    default: ''
  },
  contactDetails: {
    address: String,
    googleMapUrl: String,
    emails: [String],
    phones: [String],
    whatsapp: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
