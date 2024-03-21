const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const getJSON = async ()=> { 
  await s3.getObject({
  Bucket: "defiant-school-uniform-clamCyclicDB",
  Key: "jsonData.json",
}).promise()
}

module.exports = { getJSON }