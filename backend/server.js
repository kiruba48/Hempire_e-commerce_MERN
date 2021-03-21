import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './middleware/errorMiddleware.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import connectDB from './config/db.js';

// Environment variable.
dotenv.config();

// Connecting to Database
connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
// app.use('/api/products', productRouter)

app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);

app.use('/api/upload', uploadRouter);

// ROUTE FOR API CLIENT ID
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Making uploads folder as static file.
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Working in API...');
  });
}

// Error handling for undeclared URLs
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
