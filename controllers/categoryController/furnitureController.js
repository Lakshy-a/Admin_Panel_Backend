const newProduct = require("../../models/newProductModel");

exports.furniture = async (req, res) => {
  try {
    const furnitureCategory = await newProduct.find({ 'category.name': 'Furniture' });
    console.log(furnitureCategory.length);
    res.status(200).json(furnitureCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
