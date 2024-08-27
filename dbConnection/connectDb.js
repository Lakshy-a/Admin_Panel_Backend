const mongoose = require('mongoose');
require('dotenv').config();

const usersConnection = mongoose.createConnection(process.env.USERS_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productsConnection = mongoose.createConnection(process.env.PRODUCTS_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection errors
usersConnection.on('error', err => console.error('Users DB connection error:', err));
productsConnection.on('error', err => console.error('Products DB connection error:', err));

// Successful connection
usersConnection.once('open', () => console.log('Connected to Users DB'));
productsConnection.once('open', () => console.log('Connected to Products DB'));

// Export connections
module.exports = { usersConnection, productsConnection };
