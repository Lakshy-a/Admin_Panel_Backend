const newProduct = require("../../models/newProductModel");

// getAllProducts route
exports.allProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = "createdAt", asc = 1 } = req.query;
    const skip = (page - 1) * limit;
    const sortOrder = asc == 1 ? 1 : -1; // Determine sort order based on asc parameter

    const productsPaginated = await newProduct
      .find()
      // .populate('')  // Populate the category field with data from the categories collection
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(productsPaginated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
