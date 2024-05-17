import React, { useState } from "react"
import AWS from "aws-sdk"
import "./ImageUpload.css"
const ImageUpload = ({ bucketName }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const response = await fetch("http://18.209.62.89/api/items")
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
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Error uploading file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="containerr">
      <h1>
        {" "}
        <strong> Image Upload</strong>
      </h1>
      <div className="upload">
        <div className="upload-group">
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
          <button className="but" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        {uploadError && <p>{uploadError}</p>}
      </div>
    </div>
  )
}

export default ImageUpload
