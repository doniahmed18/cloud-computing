const express = require("express")
const app = express()
const cors = require("cors")

const publicapiRoutes = require("./api/index")
const itemsRouter = require("./api/items") // Import the items router

const port = 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mount the router
app.use("/api", publicapiRoutes)
// app.post("/create-item", async (req, res) => {
//   const { itemName, imageUrl } = req.body
//   const params = {
//     TableName: "your-table-name",
//     Item: {
//       itemId: `${Date.now()}`,
//       itemName,
//       imageUrl,
//     },
//   }

//   try {
//     await dynamodb.put(params).promise()
//     res.json({ message: "Item created successfully!" })
//   } catch (err) {
//     console.error("Error creating item in DynamoDB", err)
//     res.status(500).json({ error: "Internal server error" })
//   }
// })
app.use("/api", itemsRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
