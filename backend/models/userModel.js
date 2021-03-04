import mongoose from 'mongoose';

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
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'A user must have a isAdmin status'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
