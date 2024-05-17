const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const publicapiRoutes = require("./api/index")
const itemsRouter = require("./api/items")

const port = 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use("/api", publicapiRoutes)
app.use("/api", itemsRouter)

// Serve static files from the React build directory
const buildPath = path.join(__dirname, "../cloud-computing/frontend/build")
app.use(express.static(buildPath))

// Define a catch-all route that serves the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
