const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const publicapiRoutes = require("./api/index")
const itemsRouter = require("./api/items")

const port = 4000

// Middleware
app.use(
  cors({
    origin: "http://54.196.154.144/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Specify allowed request headers
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
)
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
