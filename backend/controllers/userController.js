import asyncHandler from 'express-async-handler';

import loginAuthToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

// @description   GET user profile
// @route   POST /api/users/profile
// @access   Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send('success');
});
