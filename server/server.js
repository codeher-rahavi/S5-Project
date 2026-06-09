const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Mount Authentication Routes
app.use('/api/auth', require('./routes/auth'));

// Base Health-Check Route
app.get('/', (req, res) => {
  res.send('IoT Industrial Monitoring API Layer Online...');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Cluster successfully.');
    app.listen(PORT, () => console.log(`Server processing on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });