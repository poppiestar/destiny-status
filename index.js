
var express = require('express');
var logger = require('winston');

var app = express();

var mongoose = require('mongoose');

var destinyStatus = require('./lib/destiny-status');
var secrets = require('./config/secrets');

app.set('port', (process.env.PORT || 4040));

mongoose.connect(secrets.db);

var 
mongoose.connect(secrets.db, function (err, db) {
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


