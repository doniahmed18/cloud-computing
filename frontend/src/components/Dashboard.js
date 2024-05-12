import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; 
import "./Dashboard.css"; // Import the corresponding CSS file

const Dashboard = () => {
  // Dummy data representing items
  const items = [
    { id: 1, name: "Item 1", image: "/amazon-logo.png" },
    { id: 2, name: "Item 2", image: "/amazon-logo.png" }, // Provide the path to the image
    { id: 3, name: "Item 3", image: "/amazon-logo.png" },
    { id: 4, name: "Item 4", image: "/amazon-logo.png" },
    { id: 5, name: "Item 5", image: "/amazon-logo.png" }
    // { id: 6, name: 'Item 6', image: 'image6.jpg' },
    // { id: 7, name: 'Item 7', image: 'image7.jpg' },
    // { id: 8, name: 'Item 8', image: 'image8.jpg' },
    // { id: 9, name: 'Item 9', image: 'image9.jpg' },
    // { id: 10, name: 'Item 10', image: 'image10.jpg' },
    // { id: 11, name: 'Item 11', image: 'image11.jpg' },
    // { id: 12, name: 'Item 12', image: 'image12.jpg' },
    // { id: 13, name: 'Item 13', image: 'image13.jpg' },
  ];

  // Function to handle edit action
  const handleEdit = (id) => {
    // Logic to handle edit action
    console.log(`Editing item with ID: ${id}`);
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm("Do you really want to delete this item?");
    if (confirmDelete) {
      // Logic to handle delete action
      console.log(`Deleting item with ID: ${id}`);
    }
  };

  return (
    <div className="background">
      <div className="app-bar">
        <h1>Web Application Hosting on AWS</h1>
      </div>
      <div className="dashboard-container">
        <Link to="/Create">
          <button className="add-button">
            <FaPlus /> Add New Item
          </button>
        </Link>
        <span className="item-count"> Number of Items: {items.length}</span>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image} alt={item.name} className="item-image" />
                  </td>
                  <td>
                    <Link to="/update">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
