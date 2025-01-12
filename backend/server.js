require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Routes
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message, err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}, // Show stack trace only in development
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle Uncaught Exceptions and Rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message, error.stack);
  process.exit(1); // Exit the process to avoid an unstable state
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit the process to avoid an unstable state
});
