const category = require("../../models/categoriesModel");

exports.categories = async (req, res) => {
  try {
    const allCategories = await category.find(); 
    // console.log(allCategories);
    res.status(200).json(allCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
