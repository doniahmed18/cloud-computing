// backend/routes/upload.js

const express = require("express")
const router = express.Router()
const AWS = require("aws-sdk")
const multer = require("multer")

const s3 = new AWS.S3()
const upload = multer({ dest: "uploads/" })

// Upload image to S3
router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file
  const params = {
    Bucket: "your-bucket-name",
    Key: file.originalname,
    Body: file.buffer,
  }
  try {
    const data = await s3.upload(params).promise()
    res.json({ imageUrl: data.Location })
  } catch (err) {
    console.error("Error uploading image to S3:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
