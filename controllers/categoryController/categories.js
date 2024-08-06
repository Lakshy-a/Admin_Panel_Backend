const Product = require("../../models/productModel");

exports.categories = async (req, res) => {
  try {
    const categories = await Product.distinct("category"); 
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
