const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');

dotenv.config();
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();


// Middleware to handle large request sizes
app.use(express.json({ limit: '50mb' })); // Set a larger limit for JSON data
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For form data

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin (frontend URL)
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
