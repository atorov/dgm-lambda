const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({
    region: 'eu-central-1',
    apiVersion: '2012-08-10',
});

exports.handler = function (event, context, callback) {
    const params = { TableName: 'dgm' };

    ddb.scan(params, (err, data) => {
        if (err) callback(err);
        else if (!data || !data.Items) {
            callback(null, [
                { name: 'Completed', value: 0 },
                { name: 'In Progress', value: 0 },
            ]);
        }
        else {
            const items = data.Items.map((item) => (item.status || {}).S);
            const completed = items.filter((item) => item === ':COMPLETED:').length;
            const inProgress = items.filter((item) => item === ':IN_PROGRESS:').length;
            callback(null, [
                { name: 'Completed', value: completed },
                { name: 'In Progress', value: inProgress },
            ]);
        }
    });
};
