/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
/* Insertion de sorts dans la base MongoDB ou dans la base SQlite                      */
/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/

var fs = require("fs");
var async = require("async");

/* Configuration MongoDB */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* Configuration SQlite */

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./sqlitedb/sorts.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the sorts database.');
});

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
    
    db.serialize(function () {
        
        /* Création des tables nécessaires (on est obligé de séparer chaque table dans un fichier            */
        /* car une seule action à la fois n'est possible avec run et il n'y a pas d'alternative avec sqlite3 */
        
        db.run(fs.readFileSync('./sql_init/create_table_sort.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/create_table_component.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/create_table_level.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/create_table_sort_component.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/create_table_sort_level.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/insert_data_table_component.sql', 'utf8'));
        db.run(fs.readFileSync('./sql_init/insert_data_table_level.sql', 'utf8'));
        
//        db.each("select name from sqlite_master where type='table'", function (err, table) {
//            console.log(table);
//        });
//        
//        var sql = 'SELECT _id FROM component';
// 
//        db.all(sql, [], (err, rows) => {
//          if (err) {
//            throw err;
//          }
//          rows.forEach((row) => {
//            console.log(row._id);
//          });
//        });
        
        async.each(sortsJson, function(item, callback) {
            console.log(item.name);
            
            db.run(`INSERT INTO sort(_id, name, school, casting_time, _range, effect, duration, saving_throw, spell_resistance, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                   [item._id, item.name, item.school, item.casting_time, item.range, item.effect, item.duration, item.saving_throw, item.spell_resistance, item.description],
            function(err) {
                
                if (err) {
                  return console.log(err.message);
                }
                
                // insérer dans SORT_COMPONENT et dans SORT_LEVEL
                callback();
            });
        } function(err) {    
            console.log('ok');
        });
        
    });
    
    callback(true);
}


module.exports = {
    /* Insertion dans la base de données MongoDB */
    insertMongoDB: insertMongoDB,
    /* Insertion dans la base de données SQlite */
    insertSQlite: insertSQlite
}