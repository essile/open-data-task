const express = require('express');
const AWS = require('aws-sdk');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 2550;

AWS.config.update({
    region: "eu-north-1",
    endpoint: "http://localhost:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyparser.json());
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.get('/api/hello', (req, res) => {
    res.json({ test: 'Hello' });
});

app.get('/api/data-from-db', (req, res) => {
    let dataItems = [];
    let params = {
        TableName: "AllSensorData"
    };
    console.log("Scanning SensorData table.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (dataItem) {
                dataItems.push(dataItem);
            });
        }
        res.json(dataItems)
    }
});

app.post('/api/new-data-to-db', (req, res) => {
    dataToBeSaved = req.body;
    console.log(req.body);

    let params = {
        TableName: "AllSensorData",
        Item: {
            "date": dataToBeSaved.date,
            "sensor1": dataToBeSaved.sensor1,
            "sensor2": dataToBeSaved.sensor2,
            "sensor3": dataToBeSaved.sensor3,
            "sensor4": dataToBeSaved.sensor4
        }
    };

    console.log("Adding the item to AllSensorData table...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
            res.json({ type: 'error', message: error.message });
        } else {
            console.log("Success, added item:", JSON.stringify(data, null, 2));
            let savedItem = params.Item;
            res.json({ type: 'success', savedItem });
        }
    });
});

app.get('/api/data-from-db', (req, res) => {
    let dataItems = [];
    let params = {
        TableName: "AllSensorData"
    };
    console.log("Scanning ALL-SensorData table.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (dataItem) {
                dataItems.push(dataItem);
            });
        }
        res.json(dataItems);
    }
});