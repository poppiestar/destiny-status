
'use strict';

var express = require('express');
var logger = require('winston');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 2 }));

function getPlayerStatus (username, system) {
    return {};
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

