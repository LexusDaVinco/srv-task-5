const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const saveJSON = async (jsonText) => {
  await s3.putObject({
    Body: JSON.stringify(jsonText),
    Bucket: "defiant-school-uniform-clamCyclicDB",
    Key: "jsonData.json",
  }).promise()
  console.log("Type of JSON Text" + typeof(jsonText));
};

module.exports = { saveJSON };