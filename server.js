const express = require('express');
const app = express();

const publicapiRoutes = require('./api/index');

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the router
app.use('/api', publicapiRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
