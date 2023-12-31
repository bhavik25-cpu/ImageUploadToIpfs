import React, { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import useFormData from "../hooks/useFormData";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [traitType, setTraitType] = useState("");
  const [value, setValue] = useState("");

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
      setFile(file);
    }
  };

  const handleAddAttribute = () => {
    if (traitType && value) {
      const newAttribute = {
        trait_type: traitType,
        value: value,
      };
      console.log(newAttribute, "newAttributenewAttribute");
      setAttributes([...attributes, newAttribute]);
      setTraitType("");
      setValue("");
    }
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...attributes];
    console.log(updatedAttributes, "updatedAttributesupdatedAttributes");
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };


  const handleUpload = async () => {
    try {
      if (!file) {
        toast.current.show({
          severity: "error",
          summary: "No image selected",
          life: 3000,
        });
        return;
      }
  
      const imageData = new FormData();
      imageData.append("image", file);
      imageData.append("name", formData.name);
      imageData.append("description", formData.description);
      imageData.append("attributes", JSON.stringify(attributes));
  
      const response = await axios.post(
              "http://localhost:3000/api/images",
              imageData
            );
  
      const uploadedImage = response.data;
      toast.current.show({
        severity: "success",
        summary: "Image Uploaded",
        life: 3000,
      });
      console.log(uploadedImage,"uploadedImageuploadedImage")
  
      resetFormData();
      setFile(null);
      setAttributes([]);
      
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.current.show({
        severity: "error",
        summary: "Image Upload Failed",
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="attributes-container">
          <h3>Attributes:</h3>
          {attributes.map((attribute, index) => (
            <div key={index} className="attribute-item">
              <span>
                {attribute.trait_type}: {attribute.value}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveAttribute(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="attribute-form">
            <div className="form-group">
              <label htmlFor="traitType">Trait Type:</label>
              <input
                type="text"
                id="traitType"
                name="traitType"
                value={traitType}
                onChange={(e) => setTraitType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Value:</label>
              <input
                type="text"
                id="value"
                name="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleAddAttribute}>
              Add
            </button>
          </div>
        </div>

        <button type="button" className="upload-button" onClick={handleUpload}>
          Upload to IPFS
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
