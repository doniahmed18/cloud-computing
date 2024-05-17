import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import "./Create.css"
import AWS from "aws-sdk"

const Create = () => {
  const [itemName, setItemName] = useState("")
  const [itemAge, setItemAge] = useState("")
  const [itemEmail, setItemEmail] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const response = await fetch("http://23.22.154.16/api/items")
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error fetching items:", error)
    }
  }
  const s3 = new AWS.S3({
    accessKeyId: "AKIAVRUVVJ5QIUYZXDZB",
    secretAccessKey: "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",
    region: "us-east-1",
  })

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleNameChange = (e) => {
    setItemName(e.target.value)
  }

  const handleAgeChange = (e) => {
    setItemAge(e.target.value)
  }

  const handleEmailChange = (e) => {
    setItemEmail(e.target.value)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected")
      return
    }

    setUploading(true)

    const params = {
      Bucket: "clouddprojectt",
      Key: selectedFile.name,
      Body: selectedFile,
    }

    try {
      const response = await s3.upload(params).promise()
      console.log("File uploaded successfully:", response.Location)
      setUploadedImageUrl(response.Location)

      // Now that the image is uploaded, proceed with form submission
      const createResponse = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: itemAge,
          name: itemName,
          email: itemEmail,
          imageURL: response.Location, // Use the uploaded image URL directly
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
      setUploadedImageUrl(null) // Reset the uploadedImageUrl state after posting the item
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Error uploading file")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await handleUpload() // Call the handleUpload function which now includes form submission logic
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

          <div className="inputfield">
            <label htmlFor="imageFile">
              {" "}
              <strong> Upload Image:</strong>
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="imageFile"
            />
          </div>
          <button className="but" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
          {uploadError && <p>{uploadError}</p>}
          {uploadedImageUrl && (
            <img
              src={uploadedImageUrl}
              className="imageuploaded"
              alt="Uploaded"
            />
          )}
        </form>
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Create
