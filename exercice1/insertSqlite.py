#!/usr/bin/python
 
import sqlite3
import json
import pprint

from sqlite3 import Error


def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return None


def select_all_component(conn):

    cur = conn.cursor()
    cur.execute("SELECT * FROM component")

    rows = cur.fetchall()
    return rows

def select_all_sort(conn):

    cur = conn.cursor()
    cur.execute("SELECT * FROM sort")

    rows = cur.fetchall()
    return rows

def select_all_level(conn):

    cur = conn.cursor()
    cur.execute("SELECT * FROM level")

    rows = cur.fetchall()
    return rows

def select_all_sort_component(conn):

    cur = conn.cursor()
    cur.execute("SELECT * FROM sort_component")

    rows = cur.fetchall()
    return rows

def select_all_sort_level(conn):

    cur = conn.cursor()
    cur.execute("SELECT * FROM sort_level")

    rows = cur.fetchall()
    return rows

def exec_sql(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def find_classe(myClass, allClass):
    for classe in allClass:
        if classe[1] == myClass:
            return classe[0]
        
def find_comp(myComp, allComp):
    for comp in allComp:
        if myComp == comp[1]:
            return comp[0]
        
def select_sort_de_la_morkitu(conn):
    cur = conn.cursor()
#    cur.execute("""
#            SELECT
#                s._id id,
#                s.name name
#            FROM
#                SORT s,
#                SORT_LEVEL sl,
#                LEVEL l,
#                SORT_COMPONENT sc,
#                COMPONENT c
#            WHERE
#                s._id = sl._id_sort
#                AND s._id = sc._id_sort
#                AND l._id = sl._id_level
#                AND c._id = sc._id_component
#
#                AND l.name LIKE '%wizard%'
#                AND sl._value <= 4
#                AND c.name = 'V'
#            """)

    cur.execute("""
            SELECT
                *
            FROM
                SORT_COMPONENT sc                
            """)

    rows = cur.fetchall()
    return rows

def main():
    database = "sqlitedb/sorts.db"

    sql_create_table_component = """
    CREATE TABLE component (
    _id                 INTEGER PRIMARY KEY,
    name                TEXT
    );
    """

    sql_create_table_level = """
    CREATE TABLE level (
    _id                 INTEGER PRIMARY KEY,
    name                TEXT
    );
    """

    sql_create_table_sort_component = """
    CREATE TABLE sort_component (
  _id_sort              INTEGER,
  _id_component         INTEGER,
  PRIMARY KEY (_id_sort, _id_component),
  FOREIGN KEY(_id_sort) REFERENCES sort(_id),
  FOREIGN KEY(_id_component) REFERENCES component(_id)
  );
  """

    sql_create_table_sort_level = """
    CREATE TABLE sort_level (
  _id_sort              INTEGER,
  _id_level             INTEGER,
  _value                INTEGER,
  PRIMARY KEY (_id_sort, _id_level),
  FOREIGN KEY(_id_sort) REFERENCES sort(_id),
  FOREIGN KEY(_id_level) REFERENCES level(_id)
  );
  """

    sql_create_table_sort = """
    CREATE TABLE sort (
    _id                 INTEGER PRIMARY KEY,
    name                TEXT,
    school              TEXT,
    casting_time        TEXT,
    _range              TEXT,
    effect              TEXT,
    duration            TEXT,
    saving_throw        TEXT,
    spell_resistance    TEXT,
    description         TEXT
    );
    """
    sql_insert_component = """
    INSERT INTO component (_id, name)
    VALUES
    (1, 'V'),
    (2, 'S'),
    (3, 'F'),
    (4, 'M'),
    (5, 'DF'),
    (6, 'F/DF'),
    (7, 'M/DF');
    """

    sql_insert_level = """
    INSERT INTO level (_id, name)
    VALUES
    (1, 'sorcerer/wizard'),
    (2, 'summoner'),
    (3, 'inquisitor'),
    (5, 'magus'),
    (6, 'bard'),
    (7, 'witch'),
    (8, 'alchemist'),
    (9, 'shaman'),
    (10, 'druid'),
    (11, 'bloodrager'),
    (12, 'ranger'),
    (13, 'cleric/oracle'),
    (14, 'antipaladin'),
    (15, 'paladin');
    """




    # create a database connection
    conn = create_connection(database)

    if conn is not None:
        exec_sql(conn, """DELETE FROM sort""")
        exec_sql(conn, """DELETE FROM sort_component""")
        exec_sql(conn, """DELETE FROM sort_level""")
        exec_sql(conn, sql_create_table_component)
        exec_sql(conn, sql_create_table_level)
        exec_sql(conn, sql_create_table_sort_component)
        exec_sql(conn, sql_create_table_sort_level)
        exec_sql(conn, sql_create_table_sort)
        exec_sql(conn, sql_insert_component)
        exec_sql(conn, sql_insert_level)

    else:
        print("Error! cannot create the database connection.")

    # Load json
    sorts = json.load(open('allSorts.json'))
    
    print "Nombre de sorts " + str(len(sorts))

    with conn:
        component = select_all_component(conn)
        level = select_all_level(conn)
        
    for sort in sorts:  
        print sort["_id"]
        row_sort = [sort["_id"],
                    sort["name"],
                    sort["school"],
                    sort["casting_time"],
                    sort["range"],
                    sort["effect"],
                    sort["duration"],
                    sort["saving_throw"],
                    sort["spell_resistance"],
                    sort["description"]]
        
        



        conn.execute('INSERT INTO sort(_id, name, school, casting_time, _range, effect, duration, saving_throw, spell_resistance, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', row_sort)
        
        for classe in sort["levels"]:
            idClasse = find_classe(classe["classe"], level)
            row_sort_level= [sort["_id"],
                            idClasse,
                            classe["level"]]
            conn.execute('INSERT INTO sort_level(_id_sort, _id_level, _value) VALUES(?, ?, ?)', row_sort_level)


        for comp in sort["components"]:
            idComp = find_comp(comp, component)
            row_sort_component = [sort["_id"],
                                  idComp]
            conn.execute('INSERT INTO sort_component(_id_sort, _id_component) VALUES(?, ?)', row_sort_component)


    pprint.pprint(select_sort_de_la_morkitu(conn))




if __name__ == '__main__':
    main()
