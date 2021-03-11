import express from 'express';
import { authUser, updatePassword } from '../controllers/authController.js';
import {
  registerUser,
  getUserProfile,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Register a new user
// @route   POST /api/users/
// @access   Public
router.route('/').post(registerUser);

// @description Authenticate user login
// @route   GET /api/users/login
// @access   Public
router.post('/login', authUser);

// @description   GET user profile
// @route   POST /api/users/profile
// @access   Private
router.route('/profile').get(protect, getUserProfile);

// @description   update user data except password
// @route   POST /api/users/updateUser
// @access   Private
router.patch('/updateUser', protect, updateUser);

// @description   update user  password
// @route   POST /api/users/updatePassword
// @access   Private
router.patch('/updatePassword', protect, updatePassword);

export default router;
