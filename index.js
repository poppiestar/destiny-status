
var express = require('express');
var logger = require('winston');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/status', function (req, res) {
    if (req.query.username && req.query.system) {
        res.json({ status: true, username: req.query.username, system: req.query.system });
    } else {
        res.status(400).json({ error: 'Username or system type not provided' });
    }
});

app.listen(app.get('port'), function () {
    logger.info('Destiny Status server running on port %d', app.get('port'));
});

