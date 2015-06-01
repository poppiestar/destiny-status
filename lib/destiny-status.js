
'use strict';

var express = require('express');
var logger = require('winston');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 2 }));

function getPlayerStatus (username, system) {
    return {
        available: true,
        lastUpdated: new Date(),
        status: 'On the hunt for Word of Crota, anyone up for some Crota HM?',
        activities: {
            weekly: {
                28: false,
                30: false,
                32: true
            },
            nightfall: true,
            crucible: false,
            ironbanner: false,
            trials: false,
            vog: {
                26: false,
                30: true
            },
            crota: {
                30: false,
                33: true
            },
            poe: {
                28: true,
                32: true,
                34: false,
                35: false
            }
        }
    };
}

function setup () {
    app.get('/status/:system?/:username?', function (req, res) {
        if (req.params.username && req.params.system) {
            var username = req.params.username;
            var system = req.params.system;

            if (username !== 'mystery') {
                var playerStatus = getPlayerStatus(username, system);
                res.json({ status: true, username: username, system: system, playerStatus: playerStatus });
            } else {
                res.status(400).json({ error: 'Requested user does not have a status' });
            }
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

    return app;
}

module.exports = {
    setup: setup
};

