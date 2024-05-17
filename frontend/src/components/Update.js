import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import "./Update.css"
import AWS from "aws-sdk"

const Update = () => {
  const { id } = useParams()

  const [itemName, setItemName] = useState("")
  const [itemAge, setItemAge] = useState("")
  const [itemEmail, setItemEmail] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)

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
      const response = await s3.upload(params, (err, data) => {
        if (err) {
          console.error("Error uploading file:", err)
          setUploadError("Error uploading file")
        }
        console.log("File uploaded successfully:", data.Location)
        setUploadedImageUrl(data.Location)

        // Proceed with updating the item in the database
        updateItem(data.Location)
      })

      // Track upload progress
      response.on("httpUploadProgress", (progress) => {
        const percentUploaded = Math.round(
          (progress.loaded / progress.total) * 100
        )
        setUploadProgress(percentUploaded)
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Error uploading file")
    }
  }

  const updateItem = async (imageURL) => {
    try {
      const response = await fetch(`http://23.22.154.16/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          age: itemAge,
          name: itemName,
          email: itemEmail,
          imageURL: imageURL,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update item")
      }

      // Handle success
      alert("Item updated successfully!")
    } catch (error) {
      console.error("Error updating item:", error)
      setUploadError("Error updating item")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await handleUpload()
    } catch (error) {
      console.error("Failed to update the item:", error)
      alert(`Failed to update the item: ${error.message}`)
    }
  }

  return (
    <div>
      <div className="app-bar">
        <h1>Update Item</h1>
      </div>
      <div className="update-container shadow">
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
            {uploading ? "Uploading..." : "Update"}
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

export default Update
