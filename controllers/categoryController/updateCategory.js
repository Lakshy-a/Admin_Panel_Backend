const Category = require('../../models/categoriesModel');

// updateCategory route
exports.updateCategory = async (req, res) => {
    const {name, imageUrl } = req.body; // updated data
    const categoryId = req.params.categoryId;
    console.log("New Image", imageUrl);
    // console.log(image);

    // console.log("Category id: ", id);
  
    try {
      const category = await Category.findByIdAndUpdate(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // update data of product in mongo db with given id
      category.name = name;
      // category.id = id;
    //   category.price = price;
    //   category.category = category;
      category.image = imageUrl;
      
      console.log(category)
  
      await category.save();
  
      res.status(200).json({message: "Category updated successfully...", category});
    } catch (error) {
      console.log(error)
    }
  };