const newProduct = require("../../models/newProductModel");

exports.electronics = async (req, res) => {
  try {
    const electronicsCategory = await newProduct.find({ 'category.name': 'Electronics' });
    console.log(electronicsCategory.length);
    res.status(200).json(electronicsCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
