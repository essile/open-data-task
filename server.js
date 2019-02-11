const express = require('express');
var AWS = require('aws-sdk');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 2550;

app.use(bodyparser.json());

AWS.config.update({
    region: "eu-north-1",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/hello', (req, res) => {
    res.json({ test: 'Hello' });
});

app.post('/api/send-to-db', (req, res) => {
    dataToBeSaved = req.body;
    console.log(req.body);

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "SensorData",
        Item: {
            "date": dataToBeSaved.date,
            "sensor1": dataToBeSaved.sensor1,
            "sensor2": dataToBeSaved.sensor2,
            "sensor3": dataToBeSaved.sensor3,
            "sensor4": dataToBeSaved.sensor4
        }
    };

    console.log("Adding a new item...", params);
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Success, added item:", JSON.stringify(data, null, 2));
        }
    });
})