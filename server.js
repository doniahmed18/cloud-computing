const express = require("express")
const app = express()
const cors = require("cors")
<<<<<<< HEAD
const publicapiRoutes = require("./api/index")
const path = require('path');
const itemsRouter = require("./api/items") // Import the items router
=======
const path = require("path")
const publicapiRoutes = require("./api/index")
const itemsRouter = require("./api/items")

>>>>>>> bee1248f60514885b5b9e1010d2634d0be202446
const port = 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

<<<<<<< HEAD
app.use("/api", publicapiRoutes)
app.use("/api", itemsRouter)
=======
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
>>>>>>> bee1248f60514885b5b9e1010d2634d0be202446
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


