import express from 'express';
import {
  authUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import {
  registerUser,
  getUserProfile,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
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

// @description Forgot Password Request from user
// @route   POST /api/users/forgotPassword
// @access   Public
router.post('/forgotPassword', forgotPassword);

// @description Reset Password Response from user
// @route   POST /api/users/resetPassword
// @access   Public
router.patch('/resetPassword/:token', resetPassword);

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

// @description  DELETE USER & GET user by id & PATCH user
// @route   DELETE /api/users/:id
// @access   Private
router
  .route('/:id')
  .delete(protect, adminProtect, deleteUser)
  .get(protect, adminProtect, getUserById)
  .patch(protect, adminProtect, updateUserByAdmin);

export default router;
