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
      const response = await fetch("http://54.196.154.144/api/items", {
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
          Accept: "application/json",
        },
      })
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

  const handleDelete = async (id, imageURL) => {
    console.log("Received id:", id) // Log the value of id
    console.log("Received imageURL:", imageURL) // Log the imageURL

    if (!id || !imageURL) {
      console.error("Invalid id or imageURL provided")
      return
    }

    // Extract the object key from the imageURL
    const objectKey = imageURL.substring(imageURL.lastIndexOf("/") + 1)

    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    )

    if (confirmDelete) {
      try {
        // Delete the item from the API
        const response = await fetch(`http://54.196.154.144/api/items/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to delete item")
        }

        // Delete the associated image from S3
        await fetch(`http://s3.amazonaws.com/clouddprojectt/${objectKey}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
            Accept: "application/json",
          },
        })

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
                      src={item.imageURL}
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
                      onClick={() => handleDelete(item.Id, item.imageURL)}
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
