
'use strict';

var request = require('supertest'),
    express = require('express');

var app = express();

app.get('/status', function (req, res) {
    res.status(200).send({ name: 'Drew' });
});

describe('GET /status', function () {
    it('responds with JSON', function (done) {
        request(app)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

