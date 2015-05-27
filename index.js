
var express = require('express');
var logger = require('winston');

var app = express();

var mongoClient = require('mongodb').MongoClient;

var destinyStatus = require('./lib/destiny-status');

app.set('port', (process.env.PORT || 4040));
app.set('mongoUrl', (process.env.PORT || 'mongodb://localhost:27017/destiny-status'));

mongoClient.connect(app.get('mongoUrl'), function (err, db) {
    if (err) {
        logger.error(err);
        return;
    }

    app.use(destinyStatus.setup(db));

    // connect to bungie.net and get the current list of activities
    // fail if there's an error, otherwise start the server
    app.listen(app.get('port'), function () {
        logger.info('Destiny Status server running on port %d', app.get('port'));
    });
});


