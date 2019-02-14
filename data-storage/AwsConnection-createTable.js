var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-north-1",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "AllSensorData",
    KeySchema: [
        { AttributeName: "date", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "date", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});