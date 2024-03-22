const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const getJSON = async ()=> { 
  await s3.getObject({
  Bucket: "cyclic-difficult-jodhpurs-bear-eu-north-1",
  Key: "jsonData.json",
}).promise()
}

module.exports = { getJSON }