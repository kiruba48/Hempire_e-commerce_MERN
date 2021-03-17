import express from 'express';

import {
  addOrder,
  getOrderById,
  updateOrderPayment,
  getLoggedUserOrders,
  getAllOrders,
  updateOrderDelivery,
} from '../controllers/orderController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Create a new order
// @route   POST /api/orders/
// @access   Private
router
  .route('/')
  .post(protect, addOrder)
  .get(protect, adminProtect, getAllOrders);

// @description  GET logged in user's order details
// @route   GET /api/orders/myOrders
// @access   Private
router.route('/myOrders').get(protect, getLoggedUserOrders);

// @description  GET order by id
// @route   GET /api/orders/:id
// @access   Private
router.route('/:id').get(protect, getOrderById);

// @description  update order by id
// @route   PATCH /api/orders/:id/pay
// @access   Private
router.route('/:id/pay').patch(protect, updateOrderPayment);

// @description  update order Delivery
// @route   PATCH /api/orders/:id/deliver
// @access   Private
router.route('/:id/deliver').patch(protect, adminProtect, updateOrderDelivery);

export default router;
