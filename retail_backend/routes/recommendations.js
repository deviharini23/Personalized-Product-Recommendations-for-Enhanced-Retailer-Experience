const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Recommendation = require("../models/Recommendation");
const jwt = require("jsonwebtoken");

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET recommendations for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const recs = await Recommendation.find({ userId })
      .populate("productId", "name category price")  // only relevant fields
      .populate("userId", "name email shopName");    // optional if you want user info

    if (recs.length === 0) return res.json({ message: "No recommendations yet", data: [] });

    // Map to just product objects or include user info if needed
    const recommendedProducts = recs.map((r) => ({
      user: r.userId,
      product: r.productId,
    }));

    res.json({ data: recommendedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;