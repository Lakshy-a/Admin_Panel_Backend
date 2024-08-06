const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController/categories');

router.get('/categories', categoriesController.categories);

module.exports = router;
