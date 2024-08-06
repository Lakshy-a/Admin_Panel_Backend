const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController/categories');
const clothes = require('../controllers/categoryController/clothesController')
const electronics = require('../controllers/categoryController/electronicsController')
const furniture = require('../controllers/categoryController/furnitureController')
const shoes = require('../controllers/categoryController/shoesController')
const miscellaneous = require('../controllers/categoryController/miscellaneousController')

router.get('/categories', categoriesController.categories);
router.get('/clothes', clothes.clothes)
router.get('/electronics', electronics.electronics)
router.get('/furniture', furniture.furniture)
router.get('/shoes', shoes.shoes)
router.get('/miscellaneous', miscellaneous.miscellaneous)

module.exports = router;
