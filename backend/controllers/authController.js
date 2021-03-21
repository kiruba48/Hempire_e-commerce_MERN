import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import loginAuthToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import ApiFeatures from '../utils/apiFeatures.js';
import { Email } from '../utils/email.js';

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
  // user.passwordConfirm = req.body.passwordConfirm; //don't have password confirm in my user model. have to take care of it
  await user.save();

  // Log user in, send JWT
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: loginAuthToken(user._id),
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  // Get the user based on POST request's mail.
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new AppError('User Not Found', 404));
  }
  // GENERATE RANDOM RESET TOKEN
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // SEND TOKEN TO USER'S EMAIL
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).passwordReset();

    res.status(200).json({
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Error occurred sending reset password email, Try again later',
        500
      )
    );
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  // GET USER BASED ON THE TOKEN
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  console.log(req.params);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, //Finding if the token expired or not: expire time greater than current time.
  });

  // IF TOKEN NOT EXPIRED AND THERE IS A USER, SET NEW PASSWORD
  if (!user) {
    return next(new AppError('Token expired', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // UPDATE changePasswordAt PROPERTY OF THE USER

  // LOG THE USER IN, SEND JWT TOKEN

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: loginAuthToken(user._id),
  });
});
