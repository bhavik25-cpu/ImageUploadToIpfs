// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use('/api/images', imageRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
