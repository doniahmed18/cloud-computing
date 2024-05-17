const express = require("express")
const app = express()
const cors = require("cors")
const publicapiRoutes = require("./api/index")
const path = require('path');
const itemsRouter = require("./api/items") // Import the items router
const port = 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api", publicapiRoutes)
app.use("/api", itemsRouter)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


