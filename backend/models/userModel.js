import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { async } from 'rxjs';

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
  },
  {
    timestamps: true,
    passwordChangedAt: Date,
  }
);

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
const User = mongoose.model('User', userSchema);

export default User;
