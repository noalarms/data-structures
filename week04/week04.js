// npm install mongodb

var request = require('request');

var fs = require('fs');

var dbName = 'aa'; // name of Mongo database (created in the Mongo shell)
var collName = 'meetings'; // name of Mongo collection (created in the Mongo shell)

var content = fs.readFileSync('week03-latlong.txt');

var meetingsData = JSON.parse(content);

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient; 

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetingsData);
    db.close();

}); //MongoClient.connect