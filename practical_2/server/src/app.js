const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import routes
const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev')); // Logging
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Check if client accepts JSON
app.use((req, res, next) => {
  if (!req.accepts('application/json')) {
    return res.status(406).json({
      error: 'Not Acceptable',
      message: 'This API only supports application/json'
    });
  }
  
  // Set Content-Type header for responses
  res.setHeader('Content-Type', 'application/json');
  next();
});

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TikTok API' });
});

// 404 handler - Route not found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: 'Route does not exist' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = app;