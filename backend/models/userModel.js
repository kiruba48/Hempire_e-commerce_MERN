import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have a email'],
      unique: true,
      lowercase: true, //
      validate: [validator.isEmail, 'Pleaser provide a valid email'], //
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      trim: true,
      minlength: 6,
      select: false, //Will not show password in any of our user output.
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Register user password encryption
// schema.pre() calls automatically when we use model.create() (which is actually call save()) to create user.
userSchema.pre('save', async function (next) {
  // Only run this function if the password is modified
  if (!this.isModified('password')) {
    return next();
  }

  // Encrypting the password from registering user
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Password Reset Instance to create Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Encrypting the reset token to store it in DB
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Password Reset token expire time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre('save', function (next) {
  //Return from here if the password is not modified or the document is new
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.method('matchPassword', async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// });

// Since we changed the passed property - select: false, we cant get the password using this.password
userSchema.methods.matchPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // this.passwordChangedAt will look like "2021-03-15-------" we will need to convert to timestamp.
    // this.passwordChangedAt.getTime() will give timestamp in milliseconds, we need to divide bu 1000 to get in secs
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // this will give the time in timestamp format.

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
const User = mongoose.model('User', userSchema);

export default User;
