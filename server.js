var express = require('express');
var port = process.env.PORT || 3333;
var app = express();


// Controlling shutdown of nodemon
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

app.use(express.static(__dirname + '/dev/patterns'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(port);
