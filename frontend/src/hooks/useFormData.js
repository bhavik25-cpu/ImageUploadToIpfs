// // frontend/src/hooks/useFormData.js
// import { useState } from 'react';

// const useFormData = (initialState) => {
//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   return [formData, handleChange];
// };

// export default useFormData;
import { useState } from "react";

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, resetFormData];
};

export default useFormData;
