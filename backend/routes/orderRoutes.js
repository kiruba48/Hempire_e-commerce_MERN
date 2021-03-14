import express from 'express';

import {
  addOrder,
  getOrderById,
  updateOrderPayment,
  getLoggedUserOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Create a new order
// @route   POST /api/orders/
// @access   Private
router.route('/').post(protect, addOrder);

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

export default router;
