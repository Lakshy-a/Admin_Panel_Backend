const express = require('express');
const router = express.Router();

const getAllUsers = require('../controllers/userControllers/getAllUsers');

router.get('/getAllUsers', getAllUsers.allUsers);

module.exports = router;
