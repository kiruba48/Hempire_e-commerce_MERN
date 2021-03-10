import asyncHandler from 'express-async-handler';

import loginAuthToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import ApiFeatures from '../utils/apiFeatures.js';

// @description   Auth user & get token
// @route   POST /api/users/login
// @access   Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // data from the client

  const user = await User.findOne({ email }).select('+password');
  let userPassword;
  let token;
  if (user) {
    userPassword = user.password;
    // Generate JWT token
    token = loginAuthToken(user._id);
  }

  //  Verify the user with password.
  if (user && (await user.matchPassword(password, userPassword))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    return next(new AppError('Invalid email or password', 401));
  }
});
