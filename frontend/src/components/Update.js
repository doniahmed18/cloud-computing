import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Update.css"

const Update = () => {
  const { id } = useParams()

  // State to store the item data
  const [item, setItem] = useState({})
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    fetchItem(id)
  }, [id])

  const fetchItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/items/${itemId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch item")
      }
      const data = await response.json()
      setItem(data)
    } catch (error) {
      console.error("Error fetching item:", error)
    }
  }

  const handleUpdate = async () => {
    try {
      const formData = new FormData()
      formData.append("image", imageFile) // Append the image file to the FormData

      const response = await fetch(`http://localhost:4000/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
      if (!response.ok) {
        throw new Error("Failed to update item")
      }
      // Handle success
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
  }
  return (
    <div className="update-container">
      <h1>Update Item</h1>
      <div className="image-container">
        <img src={item.imageURL} alt="Item" />
      </div>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            value={item.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={item.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Update Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Update
