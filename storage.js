var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var mydb;

// Connection URL
var url = 'mongodb://localhost:27017/myproject';


// export interface
var Database = function() {};

Database.prototype.get = function(){

};

Database.prototype.start = function(app) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    mydb = db;
    app.listen(4000, function () {
      console.log('Example app listening on port 4000!')
    });
  });
}

module.exports = new Database();