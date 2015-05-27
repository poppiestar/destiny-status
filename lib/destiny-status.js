
'use strict';

var express = require('express');
var logger = require('winston');

var app = express();
var bodyParser = require('body-parser');
var db;

app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 2 }));

function setup (dbInstance) {
    db = dbInstance;

    app.get('/status', function (req, res) {
        if (req.query.username && req.query.system) {
            var collection = db.collection('statuses');

            collection.find({}).toArray(function (err, data) {
                if (err) {
                    logger.error('Error retrieving statuses from database');
                    return;
                }

                res.json({ status: true, username: req.query.username, system: req.query.system, data: data });
            });
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

