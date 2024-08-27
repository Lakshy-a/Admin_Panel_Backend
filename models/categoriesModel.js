const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const category = mongoose.model("categorie", categorySchema);
module.exports = category;
