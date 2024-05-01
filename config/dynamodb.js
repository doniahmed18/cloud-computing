const AWS = require('aws-sdk');
require('dotenv').config(); 
// Initialize AWS DynamoDB Document Client
AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com' ,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  

});
AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
      console.log("Region: ", AWS.config.region);

    }
  });
const dynamodb = new AWS.DynamoDB.DocumentClient();
// to get an item with the corresponding key parameters


console.log("DynamoDB instance created successfully");
console.log("AWS_ACCESS_KEY_ID: ", process.env.AWS_ACCESS_KEY_ID);
console.log(dynamodb);
module.exports = dynamodb;
