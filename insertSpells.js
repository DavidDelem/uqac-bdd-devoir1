var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var insert = function(sortsJson, callback) {
    
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

module.exports = {
    /* Insertion dans la base de données */
    insert: insert
}