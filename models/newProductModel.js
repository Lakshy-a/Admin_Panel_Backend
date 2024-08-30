const mongoose = require("mongoose");

const newProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    productImage: {type: String, required: true},
    category: {
        categoryId: {type: Number, required: true},
        categoryName: {type: String, required: true},
        categoryImage: { type: String, required: true},
    },
    off : {
        type: Number
    }
});


const newProduct = mongoose.model("product", newProductSchema);
module.exports = newProduct;
