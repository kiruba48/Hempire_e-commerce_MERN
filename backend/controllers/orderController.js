import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';
import AppError from '../utils/appError.js';

// @description   Create new order
// @route   POST /api/orders
// @access   Private
export const addOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if the request had order items or empty
  if (orderItems && orderItems.length === 0) {
    return next(new AppError('No Order Items', 400));
  }

  //   Create order document in DB
  const order = await Order.create({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
});
