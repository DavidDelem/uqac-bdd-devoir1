import sqlite3
import json
import pprint

from sqlite3 import Error

#!/usr/bin/python

def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return None

def select_spell_to_free_pito(conn):
    cur = conn.cursor()
    cur.execute("""
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
                AND l.name LIKE '%wizard%'
                AND sl._value <= 4
                AND c.name = 'V'
                AND (SELECT count(*) FROM SORT_COMPONENT sc2 WHERE sc2._id_sort = s._id ) = 1;
            """)

    rows = cur.fetchall()
    return rows

def main():
    
    database = "sqlitedb/sorts.db"

    # create a database connection
    conn = create_connection(database)
    
    print("Available spells for pito : ")
    #Then once the database is fulfilled we get the spell list that pito can use
    pprint.pprint(select_spell_to_free_pito(conn))


if __name__ == '__main__':
    main()
