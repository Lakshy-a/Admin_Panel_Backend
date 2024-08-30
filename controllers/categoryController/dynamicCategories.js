const Categories = require('../../models/categoriesModel');

exports.dynamicCategories = async (req, res) =>{
    const {categoryId} = req.params ;
    console.log(categoryId);

    try {
        const category = await Categories.findById(categoryId);
        if(!category) {
            return res.status(404).json({"message" : "Category not found"});
        }

        console.log(category.name);

        res.status(200).json(category.name);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured...");
    }
}