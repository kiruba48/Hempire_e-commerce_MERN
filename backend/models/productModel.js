import mongoose, { mongo } from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'A product must have a image'],
    },
    brand: {
      type: String,
      required: [true, 'A product must have a brand name'],
      trim: true,
      default: 'HEMPIRE',
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'A product must have a color'],
    },
    sex: {
      type: String,
      required: [true, 'A product must have a color'],
      default: 'Unisex',
    },
    size: {
      type: [Number],
      required: [true, 'A product must have a sizes'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
    },
    reviews: {
      type: [reviewSchema],
    },
    rating: {
      type: Number,
      required: [true, 'A product must have a rating'],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, 'A product must have a Number of reviews'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'A product must have a Number of stock left'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
