import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';
import ApiFeatures from '../utils/apiFeatures.js';

// @description   Fetch all product
// @route   GET /api/products
// @access   Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  // const products = await Product.find({});
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search()
    .pagination()
    .sort();
  const products = await features.query;
  const sectionCount = await Product.countDocuments({ sex: features.section });
  const count = await Product.countDocuments({ ...features.keyword });
  const page = features.page;
  const limit = features.limit;

  // const products = await Product.find(queryObj);
  // res.json(products);
  res.json({
    products,
    page,
    pages: Math.ceil(count / limit),
    sectionPages: Math.ceil(sectionCount / limit),
  });
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

// @description CREATE A REVIEW
// @route   POST /api/products/:id/reviews
// @access   PRIVATE
const createProductReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next(new AppError('Product already reviewed', 400));
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, rev) => rev.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    next(new AppError('Product not Found', 404));
  }
});

export {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
