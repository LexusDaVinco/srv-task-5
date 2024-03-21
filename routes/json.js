const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { saveJSON } = require('../save_json');
const { getJSON } = require('../get_json');

const s3 = new AWS.S3()

// POST endpoint to save text in the S3 bucket
router.post('/', async (req, res) => {
    try {
        let myText = await saveJSON(req.body);
        console.log("MYTEXT", myText);
        res.send("JSON data saved successfully");
    } catch (error) {
        console.error("Error saving JSON data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET endpoint to get text saved in the S3 bucket
router.get('/', async (req, res) => {
    try {
        let myText = await getJSON();
        console.log("TYPE of Text from S3: ", typeof(myText));
        res.render('json', { title: 'JSON text fetched successfully', myText: myText});
    } catch (error) {
        console.log("Error fetching JSON data:", error);
        res.status(500).send("Internal Server Error >> Error fetching JSON data");
    }
});

module.exports = router;
