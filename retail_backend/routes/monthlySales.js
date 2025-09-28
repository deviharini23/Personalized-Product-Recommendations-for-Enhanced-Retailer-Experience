const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;

router.get('/', async (req, res) => {
    try {
        const monthlySales = await db.collection('analytics_monthly_sales').find({}).toArray();
        res.json(monthlySales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
