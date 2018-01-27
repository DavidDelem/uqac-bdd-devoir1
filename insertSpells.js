var fs = require("fs");

// Configuration MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Configuration SQlite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

var insertMongoDB = function(sortsJson, callback) {
    
    MongoClient.connect(url, function(err, db) {
        
        if (err) callback(false);
        var dbo = db.db("sorts");
//        var sortsJson = fs.readFileSync("test.json");
        var sorts = JSON.parse(sortsJson);  
        
        dbo.collection("sorts").insertMany(sorts, function(err, res) {
            
            if (err) callback(false);
            console.log("Number of spell inserted: " + res.insertedCount);
            db.close();
            callback(true);
            
        });
    });

}

var insertSQlite = function(sortsJson, callback) {
    // a faire
    callback(true);
}


module.exports = {
    /* Insertion dans la base de données MongoDB */
    insertMongoDB: insertMongoDB,
    /* Insertion dans la base de données SQlite */
    insertSQlite: insertSQlite
}