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
    next(new AppError(`can't find product on this server`, 404));
  }
});

export { getAllProducts, getProduct };
