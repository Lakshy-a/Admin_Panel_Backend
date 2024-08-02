const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/addProduct', productsController.addProduct);
router.delete('/removeProduct/:id', productsController.removeProduct); // removing products on the basis of their id
router.put('/updateProduct/:id', productsController.updateProduct);

module.exports = router;
