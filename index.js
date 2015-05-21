
var express = require('express');

var app = express();

app.get('/status', function (req, res) {
    res.json({ available: false });
});

app.listen(5050, function () {
    console.log('Destiny Status server running on port 5050');
});

