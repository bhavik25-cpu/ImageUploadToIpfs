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
