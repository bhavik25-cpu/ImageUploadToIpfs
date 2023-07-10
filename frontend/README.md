Image Upload to IPFS
This project allows users to upload images to IPFS (InterPlanetary File System), a decentralized file storage system. The backend is built with Node.js and Express, and the frontend is built with React.

Installation
Clone the repository:


git clone <repository-url>
Navigate to the project directory:

cd image-upload-to-ipfs
Install the dependencies for both the backend and frontend:

cd backend
npm install
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory.
Add the following environment variables to the .env file:
MONGODB_URI: MongoDB connection URI.
PINATA_API_KEY: API key for Pinata, a service used for pinning files to IPFS.
PINATA_SECRET_API_KEY: Secret API key for Pinata.
Start the backend server:

cd backend
npm start
The server will start on http://localhost:5000.

Start the frontend development server:

cd frontend
npm start
The React development server will start on http://localhost:3000.

Open the application in your browser by navigating to http://localhost:3000.

Summary
This project allows users to upload images to IPFS, a decentralized file storage system. The frontend provides a user interface for selecting an image file, entering a name and description for the image, and uploading it to the backend.

The backend receives the image file, saves it to a temporary folder, and then uploads it to IPFS using the Pinata API. The IPFS hash (CID) of the uploaded image is returned and saved in the database along with the image metadata.

The frontend displays a preview of the selected image, and upon uploading, shows a success message. The uploaded image is stored in IPFS, and its metadata, including the IPFS CID, is saved in the MongoDB database.

This project can serve as a starting point for building applications that require image uploads to IPFS, such as decentralized image galleries or NFT marketplaces.




