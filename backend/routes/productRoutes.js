const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/count').get(getProductCount);
router.route('/featured').get(getFeaturedProducts);
router.route('/:idOrSlug').get(getProduct);
router
  .route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
