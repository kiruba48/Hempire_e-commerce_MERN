import express from 'express';

import { addOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Create a new order
// @route   POST /api/orders/
// @access   Private
router.route('/').post(protect, addOrder);

export default router;
