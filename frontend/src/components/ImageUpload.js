import React, { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import useFormData from "../hooks/useFormData";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, handleChange, resetFormData] = useFormData({
    name: "",
    description: "",
  });

  const toast = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file,'File path')
      setFile(file);
    }
  };

  
  const handleUpload = async () => {
    try {
      if (!file) {
        toast.current.show({
          severity: 'error',
          summary: 'No image selected',
          life: 3000,
        });
        return;
      }

      const imageData = new FormData();
      imageData.append('image', file);
      imageData.append('name', formData.name);
      imageData.append('description', formData.description);

      const response = await axios.post('http://localhost:3000/api/images', imageData);

      const uploadedImage = response.data;
      toast.current.show({
        severity: 'success',
        summary: 'Image Uploaded',
        life: 3000,
      });

      console.log('Image uploaded:', uploadedImage);
      resetFormData();
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Image Upload Failed',
        life: 3000,
      });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };


  const handleUploadToIPFS = async () => {
    try {
      if (!file) {
        toast.current.show({
          severity: 'error',
          summary: 'No image selected',
          life: 3000,
        });
        return;
      }

      const imageData = new FormData();
      imageData.append('image', file);
      imageData.append('name', formData.name);
      imageData.append('description', formData.description);

      const response = await axios.post('http://localhost:3000/api/images', imageData);

      const uploadedImage = response.data;
      toast.current.show({
        severity: 'success',
        summary: 'Image Uploaded',
        life: 3000,
      });

      // Generate JSON file and upload to IPFS
      const jsonCIDResponse = await axios.post('http://localhost:3000/api/images/generateJsonCID', uploadedImage);
      const jsonCID = jsonCIDResponse.data;

      console.log('JSON CID:', jsonCID);

      resetFormData();
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Image Upload Failed',
        life: 3000,
      });
    }
  };

  return (
    <div className="image-upload">
      <Toast ref={toast} />
      <form>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            width: "100%",
            height: "5%",
            borderRadius: "10px",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="file">
            <div className="image-preview-container">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              )}
              {!imagePreview && (
                <div className="drag-drop-text">
                  Drag and drop an image here or click to select
                </div>
              )}
            </div>
            <input
              type="file"
              id="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              hidden
            />
          </label>
        </div>
        <div class="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="button" class="upload-button" onClick={handleUpload}>
          Upload
        </button>

        <button
          type="button"
          className="upload-button"
          onClick={handleUploadToIPFS}
        >
          Upload to IPFS
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
