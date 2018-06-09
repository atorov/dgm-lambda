exports.handler = function (event, context, callback) {
    callback(null, {
        status: 'OK',
        stage: 'dev',
        version: '0.1.0',
        userId: event.userId,
    });
};
