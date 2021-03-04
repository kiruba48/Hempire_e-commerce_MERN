import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './middleware/errorMiddleware.js';
import productRouter from './routes/productRoute.js';
import connectDB from './config/db.js';

// Environment variable.
dotenv.config();

// Connecting to Database
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Working in API...');
});

app.use('/api/products', productRouter);
// app.use('/api/products', productRouter)

// Error handling for undeclared URLs
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
