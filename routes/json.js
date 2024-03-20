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
        console.log(myText);
        res.send("JSON data retrieved successfully:", myText)
    } catch (error) {
        console.log("Error fetching JSON data:", error);
        res.status(500).send("Internal Server Error");
    }
    // Your GET route logic
    res.render('json', { title: 'JSON text saver' });
});

module.exports = router;
