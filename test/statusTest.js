
'use strict';

var request = require('supertest');

var destinyStatus = require('../lib/destiny-status');

var app = destinyStatus.setup({});

describe('GET /status', function () {
    it('responds with JSON', function (done) {
        request(app)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

