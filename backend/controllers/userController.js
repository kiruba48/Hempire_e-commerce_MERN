import asyncHandler from 'express-async-handler';

import loginAuthToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { Email } from '../utils/email.js';

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

  const url = 'www.linkedin.com/in/kiruba48';
  await new Email(user, url).sendWelcome();

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
      token: loginAuthToken(user._id),
    });
  } else {
    next(new AppError('User not found', 404));
  }
});

// @description   Update user profile except password
// @route   PATCH /api/users/profile
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

// @description   GET all users
// @route   GET /api/users
// @access   Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

// @description   DELETE USER
// @route   DELETE /api/users
// @access   Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      next(new AppError('Cannot delete Admin User', 400));
    } else {
      await user.remove();
      res.json({ message: 'User Removed' });
    }
  } else {
    next(new AppError('User not found', 404));
  }
});

// @description   GET user By ID for Admin
// @route   GET /api/users/:id
// @access   Private/Admin
export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    next(new AppError('User not found', 404));
  }
});

// @description   Update user profile except password By Admin
// @route   PATCH /api/users/:id
// @access   Private/Admin
export const updateUserByAdmin = asyncHandler(async (req, res, next) => {
  // Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    next(new AppError('User not found', 404));
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: loginAuthToken(updatedUser._id),
  });
});
