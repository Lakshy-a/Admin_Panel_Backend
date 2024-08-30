const Product = require("../../models/newProductModel");

exports.categoryWiseCount = async (req, res) => {
  try {
    const categories = await Product.distinct("category.categoryName");

    const counts = await Promise.all(
      categories.map(async (categoryName) => {
        const count = await Product.countDocuments({
          "category.categoryName": categoryName,
        });
        return {categoryName, count};
      })
    );

    // console.log(counts);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error counting products by category:", error);
  }
};
