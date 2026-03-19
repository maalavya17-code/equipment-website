const Product = require('../models/Product');

// GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
    
    // Category is now a native string Enum
    const categoryQuery = req.query.category ? { category: req.query.category } : {};

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12; // Use 12 for better grid display
    const skip = (page - 1) * limit;

    const count = await Product.countDocuments({ ...keyword, ...categoryQuery });
    const products = await Product.find({ ...keyword, ...categoryQuery })
      .limit(limit)
      .skip(skip);

    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      total: count
    });

  } catch (error) {
    next(error);
  }
};


// GET SINGLE PRODUCT
const getProduct = async (req, res, next) => {
  try {
    const isObjectId = req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: req.params.idOrSlug } : { slug: req.params.idOrSlug };

    const product = await Product.findOne(query);

    if (product) {
      res.json(product); // ✅ direct
    } else {
      res.status(404);
      throw new Error('Product not found');
    }

  } catch (error) {
    next(error);
  }
};


// CREATE PRODUCT ✅ (IMPORTANT FIX)
const createProduct = async (req, res, next) => {
  try {
    console.log("Incoming product:", req.body);

    const productData = {
      ...req.body,
      images: req.body.images || [], // 🔥 Use images from JSON payload
    };

    const product = new Product(productData);
    const saved = await product.save();
    
    console.log("Saved product:", saved);

    res.status(201).json(saved);

  } catch (error) {
    next(error);
  }
};


// UPDATE PRODUCT ✅
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, req.body);

      // 🔥 UPDATE IMAGE IF NEW UPLOADED
      if (req.body.images && req.body.images.length > 0) {
        product.images = req.body.images;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);

    } else {
      res.status(404);
      throw new Error('Product not found');
    }

  } catch (error) {
    next(error);
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }

  } catch (error) {
    next(error);
  }
};

// GET total products count
const getProductCount = async (req, res, next) => {
  try {
    const count = await Product.countDocuments();
    res.json({ total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET featured products
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProducts,
};