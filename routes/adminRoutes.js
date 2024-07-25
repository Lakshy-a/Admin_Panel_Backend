// In your routes file or index.js
const express = require('express');
const router = express.Router();

// Ensure this middleware checks if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};

router.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin');
});

module.exports = router;
