const mongoose = require('mongoose');
const Products = require('../../models/newProductModel');

exports.categoryProducts = async (req, res) => {
    const { categoryName } = req.params;
    console.log(categoryName);
    
    try {
        // Fetch products by category name
        const productsWithCategory = await Products.find({'category.categoryName': categoryName});
        console.log('Products with Category:', productsWithCategory);

        // If no products are found, handle the case
        if (productsWithCategory.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.status(200).json(productsWithCategory);

    } catch (error) {
        console.error('Error finding products by category name:', error);
        res.status(400).json({ message: error.message });
    }
};
