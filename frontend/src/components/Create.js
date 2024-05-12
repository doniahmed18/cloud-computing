import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Create.css";

const Create = () => {
  const [itemName, setItemName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log("Item Name:", itemName);
    console.log("Image File:", imageFile);
    // Reset form fields
    setItemName("");
    setImageFile(null);
  };

  return (
    <div>
      <div className="app-bar">
        <h1>Create New Item</h1>
      </div>
      <div className="create-container shadow">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageFile">Upload Image:</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit">Create Item</button>
        </form>
        <Link to="/" className="back-link">
        <FaArrowLeft/> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Create;
