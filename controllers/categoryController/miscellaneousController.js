const newProduct = require("../../models/newProductModel");

exports.miscellaneous = async (req, res) => {
  try {
    const miscellaneousCategory = await newProduct.find({ 'category.name': 'Miscellaneous' });
    console.log(miscellaneousCategory.length);
    res.status(200).json(miscellaneousCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
