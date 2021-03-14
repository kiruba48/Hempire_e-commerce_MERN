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

// @description  GET order by id
// @route   GET /api/orders/:id
// @access   Private
export const getOrderById = asyncHandler(async (req, res, next) => {
  //   Create order document in DB
  //Model.populate() - Populates document references.
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    next(new AppError('Cannot find the order', 404));
  }
});

// @description  update order Details
// @route   PATCH /api/orders/:id/pay
// @access   Private
export const updateOrderPayment = asyncHandler(async (req, res, next) => {
  //   Create order document in DB

  const order = await Order.findById(req.params.id);

  if (order) {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: req.body.id,
          status: req.body.status,
          updateTime: req.body.update_time,
          emailAddress: req.body.payer.email_address,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedOrder);
  } else {
    next(new AppError('Cannot find the order', 404));
  }
});

// @description  GET logged in user's order details
// @route   GET /api/orders/myOrders
// @access   Private
export const getLoggedUserOrders = asyncHandler(async (req, res, next) => {
  //   Create order document in DB

  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});
