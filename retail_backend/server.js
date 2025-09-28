const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Basic test route
app.get('/', (req, res) => res.send("Server is running"));

// Routes
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/top-products', require('./routes/topProducts'));
app.use('/api/monthly-sales', require('./routes/monthlySales'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
