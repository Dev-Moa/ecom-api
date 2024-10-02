const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const Product = require('./models/Product');

dotenv.config();
const connectDB = require('./config/db');

// Connect to the database
connectDB();

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();

        // Fetch product data from FakeStoreAPI
        const { data } = await axios.get('https://fakestoreapi.com/products');

        // Prepare product data for MongoDB including image URL
        const products = data.map(product => ({
            name: product.title,
            description: product.description,
            price: product.price,
            stock: Math.floor(Math.random() * 100), // Generate random stock for mock data
            image: product.image,  // Include the image URL from FakeStoreAPI
        }));

        // Insert products into MongoDB
        await Product.insertMany(products);

        console.log('FakeStoreAPI products successfully seeded');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
