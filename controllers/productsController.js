const Product = require("../models/productsModel");

// addProduct route
exports.addProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;
  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the same name already exists" });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
    });
    await newProduct.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// removeProduct route
exports.removeProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error occured..." });
  }
};

// updateProduct route
exports.updateProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body; // updated data
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update data of product in mongo db with given id
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json({message: "Product updated successfully...", product});
  } catch (error) {}
};
