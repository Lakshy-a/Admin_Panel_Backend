const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const cors = require("cors")
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const categoriesRoute = require('./routes/categoriesRoutes');


app.use(cors());
app.use(express.json({ limit: '50mb' })); // Adjust the limit as per your need
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoute);
app.use('/manageProducts', productRoutes);
app.use('/getAllUsers', userRoute);
app.use('/categories', categoriesRoute);

// Error Handling
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
