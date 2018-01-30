/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/
/* Récupération des sorts valides stockés dans la base SQlite                          */
/*-------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------*/

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./sqlitedb/sorts.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the sorts database.');
});