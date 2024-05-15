import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import "./Dashboard.css" // Import the corresponding CSS file

const Dashboard = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/items")
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error fetching items:", error)
    }
  }

  const handleEdit = (id) => {
    console.log(`Editing item with ID: ${id}`)
  }

  const handleDelete = async (id) => {
    console.log("Received id:", id) // Log the value of id
    if (!id) {
      console.error("Invalid id provided")
      return
    }
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    )
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/api/items/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error("Failed to delete item")
        }
        fetchItems()
      } catch (error) {
        console.error("Error deleting item:", error)
      }
    }
  }

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
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="item-image"
                    />
                  </td>
                  <td>
                    <Link to={`/update/${item.Id}`}>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item.Id)}
                      >
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.Id)}
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
  )
}

export default Dashboard
