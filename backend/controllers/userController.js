import asyncHandler from 'express-async-handler';

import loginAuthToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

const filterObj = (obj, ...allowedFeilds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFeilds.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// @description  Register a new user
// @route   POST /api/users
// @access   Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) {
    next(new AppError('User Already exists', 400));
  }

  // Creating a new user with the req data, calls schema.pre() to encrypt password.
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: loginAuthToken(user._id),
    });
  } else {
    next(new AppError('Invalid user data', 400));
  }
});

// @description   GET user profile
// @route   POST /api/users/profile
// @access   Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new AppError('User not found', 404));
  }
});

// @description   Update user profile except password
// @route   POST /api/users/profile
// @access   Private
export const updateUser = asyncHandler(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update, Please use /updateMyPassword',
        400
      )
    );
  }

  // Before we update the user data we need to filter out what should be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: loginAuthToken(updatedUser._id),
  });
});
