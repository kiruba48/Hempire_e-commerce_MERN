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

// @description   Update current logged in user's password
// @route   POST /api/users/
// @access   Private

export const updatePassword = asyncHandler(async (req, res, next) => {
  // GET user from DB collection
  const user = await User.findById(req.user._id).select('+password');

  // Check if POSTed current password is correct
  if (!(await user.matchPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Password does not match', 401));
  }
  // If so , update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // Log user in, send JWT
  res.status(200).json({
    token: loginAuthToken(user._id),
  });
});
