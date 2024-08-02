const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true},
  price: { type: Number, required: true },
  category: { type: String, required: true},
  imageUrl: { type: String, required: true, unique: true },
});

const Product = mongoose.model('data', productsSchema);
module.exports = Product;
