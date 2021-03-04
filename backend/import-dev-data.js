import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB(); // connecting to DataBase (mongoose)

const importData = async () => {
  try {
    // Deleting the existing data before importing new one.
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // importing new data to database.
    const createdUsers = await User.insertMany(users);

    // Getting the Admin user's _id for linking to other models
    const adminUser = createdUsers[0]._id;

    // importing product data to DB
    // Linking the admin user id to product's model
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // Deleting the existing data before importing new one.
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data Deleted');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '--delete') {
  deleteData();
} else {
  importData();
}
