import express from 'express';
import { authUser } from '../controllers/authController.js';
import { registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Register a new user
// @route   POST /api/users
// @access   Public
router.route('/').post(registerUser);

// @description   Fetch all product
// @route   GET /api/products
// @access   Public
router.post('/login', authUser);

// @description   GET user profile
// @route   POST /api/users/profile
// @access   Private
router.route('/profile').get(protect, getUserProfile);

export default router;
