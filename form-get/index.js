const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({
    region: 'eu-central-1',
    apiVersion: '2012-08-10',
});

exports.handler = function (event, context, callback) {
    const type = event.type;
    const filter = event.filter;

    if (type === 'single') {
        const params = {
            Key: { 'id': { S: filter } },
            TableName: 'dgm',
        };
        ddb.getItem(params, (err, data) => {
            if (err) callback(err);
            else callback(null, data);
        });
    }
    else if (type === 'filtered') {
        const params = { TableName: 'dgm' };
        ddb.scan(params, (err, data) => {
            if (err) callback(err);
            else {
                const filtered = data.Items.filter((item) => (filter === ':ALL:') || (item.status && item.status.S && item.status.S === filter));
                callback(null, { Items: filtered });
            }
        });
    }
    else {
        callback(null, { Items: [] });
    }
};
