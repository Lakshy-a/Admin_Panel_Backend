const mongoose = require("mongoose");
const NewProduct = require("./newProductModel"); // Adjust the path
const Category = require("./categoriesModel"); // Adjust the path

async function migrateCategories() {
  const uri = 'mongodb+srv://aryantiwari:aglhakuhodo@cluster0.qz6lge5.mongodb.net/ecoproject?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const products = await NewProduct.find({});

    for (const product of products) {
      const categoryDetails = product.category;
      const matchingCategory = await Category.findOne({
        name: categoryDetails.categoryName
      });

      if (matchingCategory) {
        await NewProduct.updateOne(
          { _id: product._id },
          { $set: { category: matchingCategory._id } }
        );
      } else {
        console.log(`No matching category found for product ${product._id}`);
      }
    }

    console.log("Category objects replaced with category references successfully.");
  } finally {
    await mongoose.disconnect();
  }
}

migrateCategories().catch(console.error);
