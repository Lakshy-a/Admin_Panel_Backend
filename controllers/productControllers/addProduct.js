const Product = require("../../models/newProductModel");

// addProduct route
exports.addProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  // Validate request body
  if (!name || !description || !price || !category || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ title: name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the same name already exists" });
    }

    // Generate the category object based on the provided category
    let categoryObject = {};

    switch (category.toLowerCase()) {
      case "shoes":
        categoryObject = {
          categoryId: 4,
          categoryName: "Shoes",
          categoryImage: "https://i.imgur.com/qNOjJje.jpeg",
        };
        break;
      case "clothes":
        categoryObject = {
          categoryId: 1,
          categoryName: "Clothes",
          categoryImage: "https://i.imgur.com/QkIa5tT.jpeg",
        };
        break;
      case "electronics":
        categoryObject = {
          categoryId: 2,
          categoryName: "Electronics",
          categoryImage: "https://i.imgur.com/ZANVnHE.jpeg",
        };
        break;
      case "furniture":
        categoryObject = {
          categoryId: 3,
          categoryName: "Furniture",
          categoryImage: "https://i.imgur.com/Qphac99.jpeg",
        };
        break;
      case "miscellaneous":
        categoryObject = {
          categoryId: 5,
          categoryName: "Miscellaneous",
          categoryImage: "https://i.imgur.com/BG8J0Fj.jpg",
        };
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    // Find the product with the highest id and increment by 1
    const maxProduct = await Product.findOne().sort({ id: -1 });
    const newId = Number(maxProduct ? Number(maxProduct.id) + 1 : 1);

    // Convert the binary image to a base64-encoded string
    // const base64Image = `data:image/jpeg;base64,${Buffer.from(
    //   imageUrl
    // ).toString("base64")}`;

    // Create a new product
    const newProduct = new Product({
      id: newId, // Assign the new incremented id
      title: name,
      description,
      price,
      category: categoryObject,
      productImage: imageUrl,
    });

    await newProduct.save();

    res
      .status(200)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
