
var express = require('express');
var logger = require('winston');

var app = express();
var bodyParser = require('body-parser');

var mongoClient = require('mongodb').MongoClient;
var mongoInstance = 'mongodb://localhost:27017/destiny-status';

app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 2 }));
app.set('port', (process.env.PORT || 5000));

mongoClient.connect(mongoInstance, function (err, db) {
    if (err) {
        logger.error(err);
        return;
    } else {
        logger.info('Connected to MongoDB');
    }

    app.get('/status', function (req, res) {
        if (req.query.username && req.query.system) {
            res.json({ status: true, username: req.query.username, system: req.query.system });
        } else {
            res.status(400).json({ error: 'Username or system type not provided' });
        }
    });

    app.post('/login', function (req, res) {
        if (req.body.username && req.body.password) {
            res.status(400).json({ username: req.body.username, password: req.body.password });
        } else {
            res.status(400).json({ error: 'Username or password not provided' });
        }
    });

    // connect to bungie.net and get the current list of activities
    // fail if there's an error, otherwise start the server
    app.listen(app.get('port'), function () {
        logger.info('Destiny Status server running on port %d', app.get('port'));
    });
});


