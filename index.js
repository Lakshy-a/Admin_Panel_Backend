require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes')
const cors = require("cors")
// const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
// app.use(authRoutes);
// app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoute);

// Error Handling
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
