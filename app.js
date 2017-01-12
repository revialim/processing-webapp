// express connection
var express = require('express');
var cubeStorage = require('./storage');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json()); 

/*
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});
*/

app.get('/cubes/:id', function(req, res) {
    console.log("Somebody wanted cube number " + req.params.id);
});

app.get('/cubes', function(req, res) {
    console.log("Selecting all cubes");
    // console.log("Selected cubes" + cubeStorage.findAll() + "with to array: "+ cubeStorage.findAll().toArray());
    
    cubeStorage.findAll().toArray().then(function(arr){
        res.send(arr);
    });
});

app.post('/cubes', function(req, res){
    console.log("Creating new cube entry");
    console.log(req.body);
    cubeStorage.create(req.body);
    res.status(201).end();
});

// app.post('/cube', ...)

cubeStorage.start(app);


