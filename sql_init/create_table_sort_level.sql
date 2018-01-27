CREATE TABLE sort_level (
  _id_sort              INTEGER, 
  _id_level             INTEGER,
  _value                INTEGER,
  PRIMARY KEY (_id_sort, _id_level),
  FOREIGN KEY(_id_sort) REFERENCES sort(_id),
  FOREIGN KEY(_id_level) REFERENCES level(_rowid_)
);