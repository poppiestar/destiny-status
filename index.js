
var express = require('express');

var app = express();

app.get('/status', function (req, res) {
    if (req.query.username && req.query.system) {
        res.json({ status: true, username: req.query.username, system: req.query.system });
    } else {
        res.status(400).json({ error: 'Username or system type not provided' });
    }
});

app.listen(5050, function () {
    console.log('Destiny Status server running on port 5050');
});

