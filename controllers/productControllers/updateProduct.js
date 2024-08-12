const Product = require('../../models/newProductModel');

// updateProduct route
exports.updateProduct = async (req, res) => {
    const {name, description, price, category, imageUrl } = req.body; // updated data
    const productId = req.params.id;
  
    try {
      const product = await Product.findByIdAndUpdate(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // update data of product in mongo db with given id
      product.title = name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.productImage = imageUrl;
      
      console.log(product)
  
      await product.save();
  
      res.status(200).json({message: "Product updated successfully...", product});
    } catch (error) {
      console.log(error)
    }
  };