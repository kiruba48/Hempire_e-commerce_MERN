import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';
import ApiFeatures from '../utils/apiFeatures.js';

// @description   Fetch all product
// @route   GET /api/products
// @access   Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  // const products = await Product.find({});
  const features = new ApiFeatures(Product.find(), req.query).filter();
  const products = await features.query;

  // const products = await Product.find(queryObj);
  res.json(products);
});

// @description   Fetch single product
// @route   GET /api/products/:id
// @access   Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    next(new AppError(`Product Not Found`, 404));
  }
});

// @description   DELETE A PRODUCT
// @route   DELETE /api/products/:id
// @access   PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    next(new AppError(`Product Not Found`, 404));
  }
});

// @description CREATE A PRODUCT
// @route   POST /api/products
// @access   PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
});

// @description UPDATE A PRODUCT
// @route   PATCH /api/products/:id
// @access   PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json(product);
});

export {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
