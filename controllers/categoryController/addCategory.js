const Category = require("../../models/categoriesModel");

// addProduct route
exports.addCategory = async (req, res) => {
  const { name, imageUrl } = req.body;
  console.log(req.body);

  // Validate request body
  if (!name || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ title: name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with the same name already exists" });
    }

    // // Find the category with the highest id and increment by 1
    const maxCategory = await Category.findOne().sort({ id: -1 });
    const newId = Number(maxCategory ? Number(maxCategory.id) + 1 : 1);
    
    // Convert the binary image to a base64-encoded string
    const base64Image = `data:image/jpeg;base64,${Buffer.from(
        imageUrl
        ).toString("base64")}`;
        
        // // Create a new category
        const newCategory = new Category({
            id: newId, // Assign the new incremented id
            name: name,
            image: imageUrl,
        });
        console.log(newCategory);



    await newCategory.save();

    res
      .status(200)
      .json({ message: "Product added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
