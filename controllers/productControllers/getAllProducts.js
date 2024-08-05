const Product = require("../../models/productModel");

// getAllProducts route
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(`Number of products: ${products.length}`);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
