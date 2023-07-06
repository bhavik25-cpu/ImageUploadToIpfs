// backend/models/imageModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
    get: (value) => {
      if (!value) return value;
      return path.join('/', value);
    },
  },
  
  imageCID: {
    type: String,
    set: (value) => {
      if (!value) return value;
      return `ipfs://${value}`;
    },
  },
  jsonCID: {
    type: String,
    set: (value) => {
      if (!value) return value;
      return `ipfs://${value}`;
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', imageSchema);
