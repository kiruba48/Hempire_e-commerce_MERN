import Product from '../models/productModel.js';
import AppError from '../utils/appError.js';

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    next(new AppError(`can't find product on this server`, 404));
  }
};

export { getAllProducts, getProduct };
