const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const adminRoutes = require("./routes/admin");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/admin", adminRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Candle Store API is running" });
});

// Error handling middleware - always return actual error for debugging
app.use((err, req, res, next) => {
  const msg = err.message || err.error?.message || (typeof err === 'string' ? err : 'Unknown error');
  console.error('Server error:', msg);
  console.error(err.stack);

  // Multer errors (file size, file type)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
  }
  if (err.message && err.message.includes('image files')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: msg,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));



