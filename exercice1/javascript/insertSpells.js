var fs = require("fs");
var async = require("async");

/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
/* Insertion de sorts dans la base MongoDB                     */
/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var insertMongoDB = function(sortsJson, callback) {
    
    MongoClient.connect(url, function(err, db) {
        
        if (err) callback(false);
        var dbo = db.db("sorts");
        
        var sorts = sortsJson;
        
        //Truncate collection
        dbo.collection("sorts").deleteMany(function(err, res) {
            if (err) throw err;
        });
        
        dbo.collection("sorts").insertMany(sorts, function(err, res) {
            
            if (err) callback(false);
            console.log("Number of spell inserted: " + res.insertedCount);
            db.close();
            callback(true);
            
        });
    });

}

/*------------------------------------------------------------*/
/*------------------------------------------------------------*/
/* Insertion de sorts dans la base SQLite                     */
/*------------------------------------------------------------*/
/*------------------------------------------------------------*/

var sqlite3 = require("sqlite3"), TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
//Supprimer le fichier de la bdd s'il existe
fs.unlink('./sqlitedb/sorts.db', (err) => {
  if (err) console.log(err.message);
});
var db = new TransactionDatabase(new sqlite3.Database("./sqlitedb/sorts.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE));

var insertSQlite = function(sortsJson, callback) {
    
    /* Création des tables nécessaires (on est obligé de séparer chaque table dans un fichier            */
    /* car une seule action à la fois n'est possible avec run et il n'y a pas d'alternative avec sqlite3 */
    db.run(fs.readFileSync('./sql_init/create_table_sort.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/create_table_component.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/create_table_level.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/create_table_sort_component.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/create_table_sort_level.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/insert_data_table_component.sql', 'utf8'));
    db.run(fs.readFileSync('./sql_init/insert_data_table_level.sql', 'utf8'));
    
    // Commencer la transaction
    db.beginTransaction(function(err, transaction) {
        
         async.each(sortsJson, function(item, callback) {
             
             // Insertion dans SORT
             transaction.run('INSERT INTO sort(_id, name, school, casting_time, _range, effect, duration, saving_throw, spell_resistance, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [item._id, item.name, item.school, item.casting_time, item.range, item.effect, item.duration, item.saving_throw, item.spell_resistance, item.description], function(err) {
                 
                 if (err) callback(err);
                 else{
                     
                     // Insertion dans SORT_LEVEL
                     async.each(item.levels, function(itemLevel, callback) {
                         
                         transaction.get('SELECT _id FROM level WHERE name = ?', [itemLevel.class.toLowerCase()], (err, row) => {
                             
                             if(typeof row !== 'undefined'){
                                 
                                 transaction.run('INSERT INTO sort_level(_id_sort, _id_level, _value) VALUES(?, ?, ?)', [item._id, row._id, itemLevel.level], function(err) {
                                     if (err) callback(err);
                                     else callback();
                                 });
                             } else callback();
                         });
                     
                     }, function(err) {
                         
                         if (err) callback(err);
                         else{
                             
                             // Insertion dans SORT_COMPONENTS
                             async.each(item.components, function(itemComponent, callback) {
                                 
                                 transaction.get('SELECT _id FROM component WHERE name = ?', [itemComponent.toUpperCase()], (err, row) => {
                                     
                                     transaction.run('INSERT INTO sort_component(_id_sort, _id_component) VALUES(?, ?)', [item._id, row._id], function(err) {
                                         if (err) callback(err);
                                         else callback();
                                     });
                                 });
                                 
                             }, function(err) {
                                 if(err)callback(err);
                                 else callback();
                             });
                         }
                     });
                 }
             });
         
         }, function(err) {
             if(err)callback(err);
             else{
                 transaction.commit(function(err) {
                     if (err) callback(err);
                     else callback();
                 });
             }
         });
    });  
}


module.exports = {
    /* Insertion dans la base de données MongoDB */
    insertMongoDB: insertMongoDB,
    /* Insertion dans la base de données SQlite */
    insertSQlite: insertSQlite
}