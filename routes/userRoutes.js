const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  // Token validation logic here
  next();
};

router.get('/dashboard', requireAuth, userController.dashboard);

module.exports = router;
