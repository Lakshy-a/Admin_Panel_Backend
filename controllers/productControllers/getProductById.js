const Product = require('../../models/productsModel');

// getProductById route
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching product details", error: error.message });
    }
};
