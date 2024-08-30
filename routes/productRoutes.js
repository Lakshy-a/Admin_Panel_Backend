const express = require('express');
const router = express.Router();

const addProducts = require('../controllers/productControllers/addProduct');
const removeProducts = require('../controllers/productControllers/removeProduct');
const updateProducts = require('../controllers/productControllers/updateProduct');
const getProductById = require('../controllers/productControllers/getProductById');
const getAllProducts = require('../controllers/productControllers/getAllProducts');

router.post('/addProduct', addProducts.addProduct);
router.delete('/removeProduct/:id', removeProducts.removeProduct); // removing products on the basis of their id
router.put('/updateProduct/:id', updateProducts.updateProduct);
router.get('/getProduct/:id', getProductById.getProductById);
router.get('/getAllProducts', getAllProducts.allProducts);

module.exports = router;
