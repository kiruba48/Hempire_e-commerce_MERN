import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Get the token if exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; //extracting token from headers
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401) //404 - unauthorized
    );
  }
  // Token verification
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    // next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Not Authorized! Login failed', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError('Your login session expired! please Login again', 401));
    }
  }
  // Check the user still exist
  const loginUserDetail = await User.findById(decoded.id);
  if (!loginUserDetail) {
    return next(
      new AppError('The user belonging to this token no longer exist', 401)
    );
  }
  // Check if user changed password after the token was issued
  // .iat => issued At
  if (loginUserDetail.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Password has been changed recently, Please login again!',
        401
      )
    );
  }

  // Grant Access To Protected Route
  req.user = loginUserDetail;
  next();
});

export const adminProtect = asyncHandler(async (req, res, next) => {
  // Check if the user is Admin
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    next(new AppError('Not Authorized! This request is for Admin only', 401));
  }
});
