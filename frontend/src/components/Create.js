import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import "./Create.css"

const Create = () => {
  const [itemName, setItemName] = useState("")
  const [itemAge, setItemAge] = useState("")
  const [itemEmail, setItemEmail] = useState("")

  const handleNameChange = (e) => {
    setItemName(e.target.value)
  }

  const handleAgeChange = (e) => {
    setItemAge(e.target.value)
  }

  const handleEmailChange = (e) => {
    setItemEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const createResponse = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: itemAge,
          name: itemName,
          email: itemEmail,
        }),
      })

      const createData = await createResponse.json()
      if (!createResponse.ok) {
        throw new Error(createData.error || "Could not create the item")
      }

      alert("Item created successfully!")

      setItemName("")
      setItemAge("")
      setItemEmail("")
    } catch (error) {
      console.error("Failed to create the item:", error)
      alert(`Failed to create the item: ${error.message}`)
    }
  }

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
            <label htmlFor="itemAge">Age:</label>
            <input
              type="text"
              id="itemAge"
              value={itemAge}
              onChange={handleAgeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemEmail">Email:</label>
            <input
              type="email"
              id="itemEmail"
              value={itemEmail}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit">Create Item</button>
        </form>
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Create
