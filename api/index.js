const express = require('express');
const router = express.Router();
const dynamodb = require('../config/dynamodb'); // Import DynamoDB instance

// Route for testing DynamoDB connection
router.get('/test', async (req, res) => {
  try {
    // Test DynamoDB connection
    const data = await dynamodb.scan({ TableName: 'Project_1' }).promise();
    console.log('DynamoDB connection test successful:', data);
    res.status(200).send('DynamoDB connection test successful');
  } catch (error) {
    console.error('Error testing DynamoDB connection:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
