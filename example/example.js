var nodeNote = require('../index');

// example: call twitter and get the error json :D
function Example()
{
    var url = 'http://localhost:8080/';

    var http = require('http');

    http.get(url, function(res) {
        nodeNote.sendNotification('httpCall', res);
    }).end();

}

/**
 * we can actually define a proper object
 * with functions to process and catch
 * notifications.
 * @type {{}}
 */
var Processor = {
    'observe': function()
    {
        nodeNote.addObserver('httpCall', this.httpCall1);
        nodeNote.addObserver('httpCall', this.httpCall2);
        nodeNote.addObserver('dataIsReady', this.dataReady);
    },
    'httpCall1': function(note)
    {
        var res = note.object;
        res.setEncoding('utf8');
        console.log('STATUS: ' + res.statusCode);
    },
    'httpCall2': function(note)
    {
        var res = note.object;
        res.on('data', function (data) {
            // and you can send another notification!
            nodeNote.sendNotification('dataIsReady', data, {
                'foo':'bar'
            });
        });
    },
    'dataReady': function(note)
    {
        var data = note.object;
        console.log("\nResponse: ", data);
        // and we can use user info too
        console.log('User data for foo: ' + note.getUserInfo('foo'));
    }
};

// then observe
Processor.observe();

// then fire it and see what happens
Example();
