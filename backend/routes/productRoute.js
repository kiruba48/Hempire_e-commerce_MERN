import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllProducts,
  getProduct,
} from '../controllers/productController.js';

const router = express.Router();

// @description   Fetch all product
// @route   GET /api/products
// @access   Public
router.route('/').get(asyncHandler(getAllProducts));

// @description   Fetch single product
// @route   GET /api/products/:id
// @access   Public
router.route('/:id').get(asyncHandler(getProduct));

export default router;
