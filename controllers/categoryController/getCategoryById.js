const Category = require('../../models/categoriesModel');

// getProductById route
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching category details", error: error.message });
    }
};
