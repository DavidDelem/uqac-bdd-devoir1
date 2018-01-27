CREATE TABLE sort_component (
  _id_sort              INTEGER, 
  _id_component         INTEGER,
  PRIMARY KEY (_id_sort, _id_component),
  FOREIGN KEY(_id_sort) REFERENCES sort(_id),
  FOREIGN KEY(_id_component) REFERENCES component(_rowid_)
);