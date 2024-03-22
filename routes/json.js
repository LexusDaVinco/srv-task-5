const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { saveJSON } = require('../save_json');
const { getJSON } = require('../get_json');
const fs = require("fs");


const s3 = new AWS.S3()

// POST endpoint to save text in the S3 bucket
router.post('/', async (req, res) => {
    try {
        const jsonData = req.body;
        console.log("DATA ", jsonData);
        // Save JSON data to S3 bucket
        await s3.putObject({
            Body: JSON.stringify(jsonData),
            Bucket: "cyclic-defiant-school-uniform-clam-eu-north-1",
            Key: "jsonData",
        }).promise();
        // Save JSON data locally
        const localFilePath = "../jsonData.json";
        fs.writeFileSync(localFilePath, JSON.stringify(jsonData));
    } catch (error) {
        console.error("Error saving JSON data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET endpoint to get text saved in the S3 bucket
router.get('/', async (req, res) => {
    try {
        (async () => {
            const data = await getJSON();
            console.log(data); // Log the retrieved JSON data
          })();
        res.render('json', { title: 'JSON text fetched successfully'});
    } catch (error) {
        console.log("Error fetching JSON data:", error);
        res.status(500).send("Internal Server Error >> Error fetching JSON data");
    }
});

module.exports = router;
