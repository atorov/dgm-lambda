const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({
    region: 'eu-central-1',
    apiVersion: '2012-08-10',
});


exports.handler = function (event, context, callback) {
    const id = '' + Date.now() + Math.random();
    const params = {
        Item: {
            'id': { S: id },
            'dgs': { S: event.dgs || '<empty>' },
            'vac': { N: event.vac ? '' + event.vac : '0' },
            'vdc': { N: event.vdc ? '' + event.vdc : '0' },
            'notes': { S: event.notes || '<empty>' },
            'status': { S: event.status || '<empty>' },
            'createdAt': { N: event.createdAt ? '' + event.createdAt : '0' },
            'updatedAt': { N: event.updatedAt ? '' + event.updatedAt : '0' },
            'owner': { S: event.owner || '<empty>' },
        },
        TableName: 'dgm',
        // ReturnValues: "ALL_OLD",
    };
    ddb.putItem(params, (err) => {
        if (err) callback(err);
        else callback(null, { ...event, id });
    });
};
