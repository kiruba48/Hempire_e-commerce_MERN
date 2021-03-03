import mongoose, { mongo } from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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

const Order = mongoose.model('User', orderSchema);

export default Order;
