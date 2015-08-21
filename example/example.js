var nod = require('../index');

// example: call twitter and get the error json :D
function Example()
{
    var url = 'https://twitter.com/i/trends?k=fca45de01c&pc=true&show_context=true&src=module';

    var https = require('https');

    https.get(url, function(res) {
        nod.sendNotification('callTwitter', res);
    }).end();

}

nod.addObserver('callTwitter', function(note) {
    var res = note.object;
    res.setEncoding('utf8');
    console.log('STATUS: ' + res.statusCode);
    res.on('data', function (data) {
        // and you can send another notification!
        nod.sendNotification('dataIsReady', data);
    });
});

// and you can add more to it!
nod.addObserver('dataIsReady', function(note) {
    var data = note.object;
    var resString = JSON.stringify(data);
    console.log(resString);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

// then fire it and see what happens
Example();
