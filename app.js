// express connection
var express = require('express');
var cubeStorage = require('./storage');
var app = express();

app.use(express.static('public'));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.get('/cube/:id', function(req, res) {
  console.log("Somebody wanted cube number " + req.params.id);
});

// app.post('/cube', ...)

cubeStorage.start(app);


