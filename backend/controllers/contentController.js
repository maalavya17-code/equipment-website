const SiteContent = require('../models/SiteContent');
const Exhibition = require('../models/Exhibition');
const Testimonial = require('../models/Testimonial');

// --- SITE CONTENT ---
// @desc    Get site content
// @route   GET /api/content
// @access  Public
const getSiteContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      // Return empty if not created yet
      content = { heroSliders: [], aboutText: '', contactDetails: {} };
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update site content
// @route   PUT /api/content
// @access  Private/Admin
const updateSiteContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(req.body);
    } else {
      Object.assign(content, req.body);
    }
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

// --- EXHIBITIONS ---
const getExhibitions = async (req, res, next) => {
  try {
    const exhibitions = await Exhibition.find({}).sort({ date: 1 });
    res.json(exhibitions);
  } catch (error) {
    next(error);
  }
};

const createExhibition = async (req, res, next) => {
  try {
    const ex = new Exhibition(req.body);
    const created = await ex.save();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const deleteExhibition = async (req, res, next) => {
  try {
    const ex = await Exhibition.findById(req.params.id);
    if (ex) {
      await ex.deleteOne();
      res.json({ message: 'Exhibition removed' });
    } else {
      res.status(404);
      throw new Error('Exhibition not found');
    }
  } catch (error) {
    next(error);
  }
};

// --- TESTIMONIALS ---
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = new Testimonial(req.body);
    const created = await testimonial.save();
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404);
      throw new Error('Testimonial not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSiteContent,
  updateSiteContent,
  getExhibitions,
  createExhibition,
  deleteExhibition,
  getTestimonials,
  createTestimonial,
  deleteTestimonial
};
