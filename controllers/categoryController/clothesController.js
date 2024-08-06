const newProduct = require("../../models/newProductModel");

exports.clothes = async (req, res) => {
  try {
    const clothesCategory = await newProduct.find({ 'category.name': 'Clothes' });
    console.log(clothesCategory.length);
    res.status(200).json(clothesCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
