
'use strict';

var request = require('supertest');

var destinyStatus = require('../lib/destiny-status');

var app = destinyStatus.setup({});

describe('getting player statuses', function () {
    describe('player who exists', function () {
        it('responds with player status', function (done) {
            request(app)
                .get('/status/psn/psnplayer')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('player who doesn\'t exist', function () {
        it('responds with a player not found error', function (done) {
            request(app)
                .get('/status/psn/mystery')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });

    describe('missing parameters', function () {
        it('responds with an invalid request error', function (done) {
            request(app)
                .get('/status')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });
});

