const Categories = require('../../models/categoriesModel');

exports.dynamicCategories = async (req, res) =>{
    const {categoryId} = req.params ;
    // console.log(req);

    try {
        const category = await Categories.findById(categoryId);
        if(!category) {
            return res.status(404).json({"message" : "Category not found"});
        }

        console.log(category);

        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured...");
    }
}