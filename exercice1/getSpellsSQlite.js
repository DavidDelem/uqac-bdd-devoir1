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
	s._id id,
    s.name name
FROM
	SORT s,
	SORT_LEVEL sl,
	LEVEL l,
	SORT_COMPONENT sc,
	COMPONENT c
WHERE
	s._id = sl._id_sort
	AND s._id = sc._id_sort
	AND l._id = sl._id_level
	AND c._id = sc._id_component
	
	AND l.name LIKE ?
	AND sl._value <= ?
	AND c.name = ?
    AND (SELECT count(*) FROM SORT_COMPONENT sc2 WHERE sc2._id_sort = s._id ) = 1`;
 
db.all(sql, ["%wizard%", 4, "V"], (err, rows) => {
    
  if (err) throw err;
  rows.forEach((row) => {
    console.log(`${row.id} - ${row.name}`);
  });
});
 
// close the database connection
db.close();