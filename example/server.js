// quick app
var express = require('express');
var path = require('path');

var app = express();

app.set('port', 8080);

app.get('/', function(req, res) {
    res.send({
        status:200,
        message:'Hello World!'
    });
});

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
