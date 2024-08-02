const express = require('express');
const router = express.Router();

const addProducts = require('../controllers/productControllers/addProduct');
const removeProducts = require('../controllers/productControllers/removeProduct');
const updateProducts = require('../controllers/productControllers/updateProduct');

router.post('/addProduct', addProducts.addProduct);
router.delete('/removeProduct/:id', removeProducts.removeProduct); // removing products on the basis of their id
router.put('/updateProduct/:id', updateProducts.updateProduct);

module.exports = router;
