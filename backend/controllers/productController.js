const Product = require('../models/Product');

// GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category }).populate('category', 'name slug');

    // ✅ NO LOCALHOST LOGIC
    res.json(products);

  } catch (error) {
    next(error);
  }
};


// GET SINGLE PRODUCT
const getProduct = async (req, res, next) => {
  try {
    const isObjectId = req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: req.params.idOrSlug } : { slug: req.params.idOrSlug };

    const product = await Product.findOne(query).populate('category', 'name slug');

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
    const productData = {
      ...req.body,
      images: req.body.images || [], // 🔥 Use images from JSON payload
    };

    const product = new Product(productData);
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);

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

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};