// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   category: String,
//   imageUrl: String,
// }); // Specify the collection name

// const Product = mongoose.model('datas', productSchema);

// module.exports = Product;
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  // Add other fields as necessary
}, { collection: 'datas' }); // Specify the collection name

const Data = mongoose.model('data', dataSchema);

module.exports = Data;

