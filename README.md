# nodenote
 IOS style internal notification system for managing multithreaded (or in reality, async) calls

## the idea:
Declutter the callback codes and make it easy to logically and systematically arrange your callbacks. See the codes below:
  
Before:
```
Foo.bar(function(result1) {
  doSomething(result1).on('finish', function(result2) {
    do2ndThing(result2).on('finish', function(result3) {
      do3rdThing(result3, ...);
      ...
    });
  });
});
```

After:
```
var note = require('nodenote');

Foo.bar(function(result1) {
    note.sendNotification('result1Received', result1);  
});

note.addObserver('result1Received', function(note) {
    var result1 = note.object;
    // do something
}); 
```

## Example How-to
```
cd example;
```
start server
```
node server.js & > /dev/null
```
test by running example
```
node example.js
```
