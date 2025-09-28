const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // create Product model

// GET /api/top-products
router.get("/", async (req, res) => {
  try {
    // Fetch top 5 products by sales
    const topProducts = await Product.find().sort({ sales: -1 }).limit(5);
    res.json(topProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
