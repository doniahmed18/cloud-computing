// backend/lambda/resizeImage.js

const AWS = require("aws-sdk")
const sharp = require("sharp")

const s3 = new AWS.S3()

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name
  const key = event.Records[0].s3.object.key

  try {
    const params = {
      Bucket: bucket,
      Key: key,
    }
    const data = await s3.getObject(params).promise()
    const resizedImage = await sharp(data.Body)
      .resize({ width: 100, height: 100 })
      .toBuffer()

    const uploadParams = {
      Bucket: "resized-images-bucket",
      Key: `resized-${key}`,
      Body: resizedImage,
    }
    await s3.upload(uploadParams).promise()
  } catch (err) {
    console.error("Error resizing image:", err)
    throw err
  }
}
