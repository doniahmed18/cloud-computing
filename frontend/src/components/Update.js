import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Update.css" //

const Update = () => {
  const { id } = useParams()

  // State to store the item data
  const [item, setItem] = useState({})

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
    // Construct the UpdateExpression and ExpressionAttributeValues
    const updateParams = {
      TableName: "Project_1",
      Key: {
        Id: item.Id, // Assuming "Id" is the primary key
      },
      UpdateExpression:
        "SET #nameAttr = :nameValue, #ageAttr = :ageValue, #emailAttr = :emailValue, #imageUrlAttr = :imageUrlValue",
      ExpressionAttributeNames: {
        "#nameAttr": "name",
        "#ageAttr": "age",
        "#emailAttr": "email",
        "#imageUrlAttr": "imageUrl",
      },
      ExpressionAttributeValues: {
        ":nameValue": item.name,
        ":ageValue": item.age,
        ":emailValue": item.email,
        ":imageUrlValue": item.imageUrl,
      },
      ReturnValues: "ALL_NEW",
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/items/${item.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateParams),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to update item")
      }
      // Handle success
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: value,
    })
  }

  return (
    <div className="update-container">
      <h1>Update Item</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Update
