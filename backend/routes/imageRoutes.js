
const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ dest: 'temp/' }); // Specify the temporary destination folder for uploaded files

router.post('/', upload.single('image'), imageController.uploadImage);

router.post('/generateJsonCID', imageController.generateJsonCID);


module.exports = router;
