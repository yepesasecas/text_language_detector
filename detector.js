var readline   = require('line-reader');
var Classifier = require("classifier");
var detector   = new Classifier.Bayesian();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var res = {state: detector.classify(msg), msg: msg}
    console.log(res.state + ': ' + res.msg);
    io.emit('chat response', res);
  });
});

http.listen(3000, function () {
  readline.eachLine('./data/angry.txt', function(line, last) {
      detector.train(line, "angry");
      console.log(line);
      if(last){
        readline.eachLine('./data/happy.txt', function(line, last) {
            detector.train(line, "happy");
            console.log(line);
            if(last){
              console.log('Devora Trained and listening on port 3000!');
            }
        });
      }
  });

});
