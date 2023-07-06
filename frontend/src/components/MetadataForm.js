// frontend/src/components/MetadataForm.js
import React, { useState,useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import useFormData from '../hooks/useFormData';

const MetadataForm = () => {
  const [metadataId, setMetadataId] = useState('');
  const [formData, handleChange, resetFormData] = useFormData({
    name: '',
    description: '',
    imagePath: '',
  });
  const toast = useRef(null);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/metadata', formData);

      toast.current.show({ severity: 'success', summary: 'Metadata Uploaded', life: 3000 });

      console.log('Metadata uploaded:', response.data);
      resetFormData();
    } catch (error) {
      console.error('Error uploading metadata:', error);
      toast.current.show({ severity: 'error', summary: 'Metadata Upload Failed', life: 3000 });
    }
  };

  const handleUploadJSON = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/metadata/upload-json/${metadataId}`);

      toast.current.show({ severity: 'success', summary: 'Metadata JSON Uploaded to IPFS', life: 3000 });

      console.log('Metadata JSON uploaded:', response.data);
      setMetadataId('');
    } catch (error) {
      console.error('Error uploading metadata JSON:', error);
      toast.current.show({ severity: 'error', summary: 'Metadata JSON Upload Failed', life: 3000 });
    }
  };

  return (
    <div className="metadata-form">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit}>
      <div class="form-group">
  <label htmlFor="name">Name:</label>
  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
</div>
<div class="form-group">
  <label htmlFor="description">Description:</label>
  <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
</div>
<div class="form-group">
  <label htmlFor="imagePath">Image Path:</label>
  <input type="text" id="imagePath" name="imagePath" value={formData.imagePath} onChange={handleChange} required />
</div>

      </form>
      <button type="submit" class="submit-button">Submit</button>
      <button onClick={handleUploadJSON} class="upload-json-button">Upload to IPFS</button>

      </div>
  );
};

export default MetadataForm;
