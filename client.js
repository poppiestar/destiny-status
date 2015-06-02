
var express = require('express');
var logger = require('winston');

var app = express();

var destinyStatus = require('./lib/destiny-status');
var activities = require('./lib/activities');
var secrets = require('./config/secrets');

app.set('port', (process.env.PORT || 4040));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var router = express.Router();

router
    .get('/', function (req, res) {
        res.render('index');
        // if logged in redirect to dashboard
    })
    .get('/dashboard', function (req, res) {
        res.render('dashboard', {});
    })
    .post('/login', function (req, res) {
    })
    .get('/status/:system?/:username?', function (req, res) {
        if (req.params.username && req.params.system) {
            var username = req.params.username;
            var system = req.params.system;

            // this will be replaced with a server call, hacky for now
            var playerStatus = destinyStatus.getPlayerStatus(username, system);

            res.render('status/view', { activities: activities, status: playerStatus });
        }
    })
    .get('/status/:system?/:username?/edit', function (req, res) {
        if (req.params.username && req.params.system) {
            var username = req.params.username;
            var system = req.params.system;

            // this will be replaced with a server call, hacky for now
            var playerStatus = destinyStatus.getPlayerStatus(username, system);

            res.render('status/edit', { activities: activities, status: playerStatus });
        }
    });

app.use(router);

// connect to bungie.net and get the current list of activities
// fail if there's an error, otherwise start the server
app.listen(app.get('port'), function () {
    logger.info('Destiny Status client running on port %d', app.get('port'));
});


