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
/*
app.get('/cubes/:id', function(req, res) {
    console.log("Somebody wanted cube number " + req.params.id);
    cubeStorage.findbyID(req.params.id, 'cubes').toArray().then(function(arr){
        res.send(arr);
    });
});
*/

app.get('/cubes', function(req, res) {
    console.log("Selecting all cubes");
    // console.log("Selected cubes" + cubeStorage.findAll() + "with to array: "+ cubeStorage.findAll().toArray());
    
    cubeStorage.findAll('cubes').toArray().then(function(arr){
        res.send(arr);
    });
});

app.post('/cubes', function(req, res){
    console.log("Creating new cube entry");
    console.log(req.body);
    cubeStorage.create(req.body, 'cubes');
    res.status(201).end();
});

app.get('/cubeSketches', function(req, res) {
    console.log("Selecting all sketches");
    cubeStorage.findAll('sketches').toArray().then(function(arr){
        res.send(arr);
    });
});

app.post('/cubeSketches', function(req, res){
    console.log("Creating new sketch entry");
    cubeStorage.create(req.body, 'sketches');
    res.status(201).end();
});

// app.post('/cube', ...)

cubeStorage.start(app);


