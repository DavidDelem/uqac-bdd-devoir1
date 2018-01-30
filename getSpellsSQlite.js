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

var sql = `
SELECT
	s._id,
    s._name
FROM
	SORT s,
	SORT_LEVEL sl,
	LEVELS l,
	SORT_COMPONENT sc,
	COMPONENT c
WHERE
	s._id = sl._id_sort
	AND s._id = sc._id_sort
	AND l._id = sl._id_level
	AND c._id = sc._id_component
	
	AND CONTAINS(l.name, 'wizard')
	AND sl.value <= 4
	AND c.name = 'V'`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("Id: "+row._id+", Name: "+row._name);
  });
});
 
// close the database connection
db.close();