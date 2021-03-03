import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

// Environment variable.
dotenv.config();

// Connecting to Database
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Working in API...');
});

app.get('/api/products', (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     products,
  //   },
  // });
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id == req.params.id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     product,
  //   },
  // });
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
