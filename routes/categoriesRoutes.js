const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController/categories');
const clothes = require('../controllers/categoryController/clothesController')
const electronics = require('../controllers/categoryController/electronicsController')
const furniture = require('../controllers/categoryController/furnitureController')
const shoes = require('../controllers/categoryController/shoesController')
const miscellaneous = require('../controllers/categoryController/miscellaneousController')
const updateCategory = require('../controllers/categoryController/updateCategory');
const getCategoryById = require('../controllers/categoryController/getCategoryById');
const addCategory = require('../controllers/categoryController/addCategory');
const dynamicCategories = require('../controllers/categoryController/dynamicCategories');

router.get('/allCategories', categoriesController.categories);
router.put('/updateCategory/:categoryId', updateCategory.updateCategory)
router.post('/addCategory', addCategory.addCategory);
router.get('/getCategory/:id', getCategoryById.getCategoryById);
router.get('/clothes', clothes.clothes)
router.get('/electronics', electronics.electronics)
router.get('/furniture', furniture.furniture)
router.get('/shoes', shoes.shoes)
router.get('/miscellaneous', miscellaneous.miscellaneous)
router.get('/categoryId/:categoryId', dynamicCategories.dynamicCategories);

module.exports = router;
