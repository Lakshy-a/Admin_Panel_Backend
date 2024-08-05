const Product = require('../../models/productModel');

// addProduct route
exports.addProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  // Validate request body
  if (!name || !description || !price || !category || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: 'Product with the same name already exists' });
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

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
