const newProduct = require("../../models/newProductModel");

exports.categories = async (req, res) => {
  try {
    const categories = await newProduct.distinct("category"); 
    console.log(categories);
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
