const Product = require('../../models/newProductModel');

// removeProduct route
exports.removeProduct = async (req, res) => {
    const {id} = req.params;
    console.log(id);
  
    try {
      const product = await Product.findByIdAndDelete(id);
      console.log(product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Some error occured..." });
    }
  };