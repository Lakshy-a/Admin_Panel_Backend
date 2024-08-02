const express = require('express');
const router = express.Router();
const signup = require('../controllers/authControllers/signupController');
const login = require('../controllers/authControllers/loginController');
const forgotpassword = require('../controllers/authControllers/forgotpasswordController');

router.post('/signup', signup.signup);
router.post('/login', login.login);
router.post('/forgot-password', forgotpassword.forgotPassword);

module.exports = router;
