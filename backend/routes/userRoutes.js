import express from 'express';
import { authUser, updatePassword } from '../controllers/authController.js';
import {
  registerUser,
  getUserProfile,
  updateUser,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @description  Register a new user
// @route   POST /api/users/
// @access   Public
router.route('/').post(registerUser).get(protect, adminProtect, getAllUsers);

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

// @description  DELETE USER
// @route   DELETE /api/users/:id
// @access   Private
router.delete('/:id', protect, adminProtect, deleteUser);

export default router;
