
var express = require('express');
var logger = require('winston');

var app = express();

var mongoose = require('mongoose');

var destinyStatus = require('./lib/destiny-status');
var activities = require('./lib/activities');
var secrets = require('./config/secrets');

app.set('port', (process.env.PORT || 4040));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

mongoose.connect(secrets.db, function (err, db) {
    if (err) {
        logger.error(err);
        return;
    }

    app.use(destinyStatus.setup(db));

    app.get('/status/:system?/:username?/edit', function (req, res) {
        if (req.params.username && req.params.system) {
            var username = req.params.username;
            var system = req.params.system;

            var playerStatus = destinyStatus.getPlayerStatus(username, system);
            res.render('status/edit', { activities: activities, status: playerStatus });
        }
    });

    // connect to bungie.net and get the current list of activities
    // fail if there's an error, otherwise start the server
    app.listen(app.get('port'), function () {
        logger.info('Destiny Status server running on port %d', app.get('port'));
    });
});


