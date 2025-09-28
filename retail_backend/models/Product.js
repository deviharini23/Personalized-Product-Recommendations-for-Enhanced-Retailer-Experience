const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  sales: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
