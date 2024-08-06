const newProduct = require("../../models/newProductModel");

exports.shoes = async (req, res) => {
  try {
    const shoesCategory = await newProduct.find({ 'category.name': 'Shoes' });
    console.log(shoesCategory.length);
    res.status(200).json(shoesCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
