// backend/controllers/imageController.js
const axios = require('axios');
const Image = require('../models/imageModel');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config(); // Load environment variables from .env file

const uploadToIPFS = async (imagePath) => {
  const apiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const apiKey = process.env.PINATA_API_KEY;
  const apiSecretKey = process.env.PINATA_SECRET_API_KEY;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(imagePath));

  const response = await axios.post(apiUrl, formData, {
    maxContentLength: 'Infinity',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecretKey,
    },
  });

  return response.data.IpfsHash;
};


const generateJsonCID = async (jsonData) => {
  try {
    const apiUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const apiKey = process.env.PINATA_API_KEY;
    const apiSecretKey = process.env.PINATA_SECRET_API_KEY;

    const response = await axios.post(apiUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecretKey,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error generating JSON CID:', error);
    throw new Error('Failed to generate JSON CID');
  }
};


const uploadImage = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { path: tempPath, mimetype } = req.file;
    const extension = mimetype.split('/')[1];
    const imagePath = `images/${Date.now()}.${extension}`; // Generate a unique file name using timestamp
    const destinationPath = path.join(__dirname, '..', 'public', imagePath);
    const directory = path.dirname(destinationPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.renameSync(tempPath, destinationPath);

    // Upload image to IPFS and get CID
    const imageCID = await uploadToIPFS(destinationPath);

    // Create a JSON object with the desired data
    const jsonData = {
      name,
      description,
      imageCID: `ipfs://${imageCID}`,
    };

    // Generate JSON CID and store it in the database
    const jsonCID = await generateJsonCID(JSON.stringify(jsonData));

    // Save image information to the database
    const image = new Image({
      name,
      description,
      imagePath,
      imageCID,
      jsonCID,
    });

    const savedImage = await image.save();

    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};



module.exports = {
  uploadImage,
  generateJsonCID,
};


