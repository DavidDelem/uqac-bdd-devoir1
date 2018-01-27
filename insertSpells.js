var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sorts");
    var sortsJson = fs.readFileSync("aa.json");
    var sorts = JSON.parse(sortsJson);  
    dbo.collection("sorts").insertMany(sorts, function(err, res) {
        if (err) throw err;
        console.log("Number of spell inserted: " + res.insertedCount);
        db.close();
  });
});