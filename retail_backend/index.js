require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  credentials: true,
}));
app.use(express.json());

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(process.env.MONGO_URI, {
  dbName: "retail_db", // make sure this matches your DB
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// ----------------------
// Routes
// ----------------------
const authRouter = require('./routes/auth'); // login/register routes
const recommendationRouter = require('./routes/recommendations');
const topProductsRouter = require('./routes/topProducts');
const monthlySalesRouter = require('./routes/monthlySales');

app.use('/api/auth', authRouter); // <-- your login/register endpoints
app.use('/api/recommendations', recommendationRouter);
app.use('/api/top-products', topProductsRouter);
app.use('/api/monthly-sales', monthlySalesRouter);

// ----------------------
// Default Route
// ----------------------
app.get('/', (req, res) => {
  res.send('✅ Retail Analytics Backend is running');
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
