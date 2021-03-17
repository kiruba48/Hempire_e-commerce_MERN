import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description   Fetch all product, CREATE a product
// @route   GET /api/products
// @access   Public
router
  .route('/')
  .get(getAllProducts)
  .post(protect, adminProtect, createProduct);

// @description   Fetch single product, UPDATE a product by id
// @route   GET /api/products/:id
// @access   Public
router
  .route('/:id')
  .get(getProduct)
  .patch(protect, adminProtect, updateProduct);

// @description DELETE A PRODUCT
// @route   DELETE /api/products/:id
// @access   PRIVATE/ADMIN
router.delete('/:id', protect, adminProtect, deleteProduct);

// @description CREATE A REVIEW
// @route   POST /api/products/:id/reviews
// @access   PRIVATE
router.post('/:id/reviews', protect, createProductReview);

export default router;
