
'use strict';

var request = require('supertest');

var destinyStatus = require('../lib/destiny-status');


describe('GET /status', function () {
    var dummyDb = {};
    dummyDb.collection = function () { return { find: function () {} }; };

    var app = destinyStatus.setup(dummyDb);

    it('responds with JSON', function (done) {
        request(app)
            .get('/status/psn/psnplayer')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /status', function () {
    var app = destinyStatus.setup({});

    it('responds with JSON', function (done) {
        request(app)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

