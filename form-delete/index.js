const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({
    region: 'eu-central-1',
    apiVersion: '2012-08-10',
});

exports.handler = function (event, context, callback) {
    const params = {
        Key: { id: { S: event.id } },
        TableName: 'dgm',
    };
    ddb.deleteItem(params, (err) => {
        if (err) callback(err);
        else callback(null, event);
    });
};
