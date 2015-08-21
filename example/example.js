var nodeNote = require('../index');

// example: call twitter and get the error json :D
function Example()
{
    var url = 'http://localhost:8080/';

    var http = require('http');

    http.get(url, function(res) {
        nodeNote.sendNotification('callTwitter', res);
    }).end();

}

// 1st observer
nodeNote.addObserver('callTwitter', function(note) {
    var res = note.object;
    res.setEncoding('utf8');
    console.log('STATUS: ' + res.statusCode);
});

// 2nd. you can add on top!
nodeNote.addObserver('callTwitter', function(note) {
    var res = note.object;
    res.on('data', function (data) {
        // and you can send another notification!
        nodeNote.sendNotification('dataIsReady', data, {
            'foo':'bar'
        });
    });

});

// the one that's sent within the observer
nodeNote.addObserver('dataIsReady', function(note) {
    var data = note.object;
    console.log("\nResponse: ", data);
    // and we can use user info too
    console.log('User data for foo: ' + note.getUserInfo('foo'))
});


// then fire it and see what happens
Example();
