// backend/routes/items.js

const express = require("express")
const router = express.Router()
const AWS = require("aws-sdk")
const s3 = new AWS.S3()
AWS.config.update({ region: process.env.AWS_REGION })

const docClient = new AWS.DynamoDB.DocumentClient()

// Create item
router.post("/items", async (req, res) => {
  const { age, name, email, imageURL } = req.body
  const params = {
    TableName: "Project_1",
    Item: {
      Id: Date.now().toString(),
      age,
      name,
      email,
      imageURL,
    },
  }
  try {
    await docClient.put(params).promise()
    res.json({ message: "Item created successfully" })
  } catch (err) {
    console.error("Error creating item:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/items", async (req, res) => {
  const params = {
    TableName: "Project_1", // Replace 'Project/1' with your DynamoDB table name
  }
  try {
    const data = await docClient.scan(params).promise()
    res.json(data.Items)
  } catch (err) {
    console.error("Error getting items:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get single item by ID
router.get("/items/:id", async (req, res) => {
  const { id } = req.params
  const params = {
    TableName: "Project_1", // Replace 'Project/1' with your DynamoDB table name
    Key: {
      Id: id,
    },
  }
  try {
    const data = await docClient.get(params).promise()
    if (!data.Item) {
      return res.status(404).json({ error: "Item not found" })
    }
    res.json(data.Item)
  } catch (err) {
    console.error("Error getting item:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/items/:id", async (req, res) => {
  const { id } = req.params
  const { age, name, email, imageURL } = req.body

  try {
    const existingItem = await docClient
      .get({ TableName: "Project_1", Key: { Id: id } })
      .promise()
    if (!existingItem.Item) {
      return res.status(404).json({ error: "Item not found" })
    }

    const oldImageURL = existingItem.Item.imageURL

    let updatedImageURL = oldImageURL
    if (imageURL) {
      updatedImageURL = imageURL
    }

    const params = {
      TableName: "Project_1",
      Key: { Id: id },
      UpdateExpression:
        "SET age = :age, #n = :name, email = :emailValue, imageURL = :imageURL, oldImageURL = :oldImageURL",
      ExpressionAttributeNames: { "#n": "name" },
      ExpressionAttributeValues: {
        ":age": age,
        ":name": name,
        ":emailValue": email,
        ":imageURL": updatedImageURL,
        ":oldImageURL": oldImageURL,
      },
      ReturnValues: "ALL_NEW",
    }

    const data = await docClient.update(params).promise()
    res.json(data.Attributes)
  } catch (err) {
    console.error("Error updating item:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete item
router.delete("/items/:id", async (req, res) => {
  const { id } = req.params
  const params = {
    TableName: "Project_1", // Replace with your actual DynamoDB table name
    Key: {
      Id: id,
    },
  }
  try {
    await docClient.delete(params).promise()
    res.json({ message: "Item deleted successfully" })
  } catch (err) {
    console.error("Error deleting item:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/images/:imageURL", async (req, res) => {
  const { imageURL } = req.params

  // Specify the bucket name
  const bucketName = "clouddprojectt" // Replace 'your-bucket-name' with your S3 bucket name

  // Set parameters for deleting the image
  const params = {
    Bucket: bucketName,
    Key: imageURL, // Use the image URL directly as the key
  }

  try {
    // Delete the image from the S3 bucket
    await s3.deleteObject(params).promise()
    res.json({ message: "Image deleted successfully" })
  } catch (error) {
    console.error("Error deleting image:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
