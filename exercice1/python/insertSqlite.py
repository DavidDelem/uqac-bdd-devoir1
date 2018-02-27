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

def create_table_component(conn):
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS component (
    _id                 INTEGER PRIMARY KEY,
    name                TEXT
    );
    """)


def create_table_level(conn):
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS level (
    _id                 INTEGER PRIMARY KEY,
    name                TEXT
    );
    """)


def create_table_sort_component(conn):
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS sort_component (
    _id_sort              INTEGER,
    _id_component         INTEGER,
    PRIMARY KEY (_id_sort, _id_component),
    FOREIGN KEY(_id_sort) REFERENCES sort(_id),
    FOREIGN KEY(_id_component) REFERENCES component(_id)
    );
    """)

def create_table_sort_level(conn):
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS sort_level (
    _id_sort              INTEGER,
    _id_level             INTEGER,
    _value                INTEGER,
    PRIMARY KEY (_id_sort, _id_level),
    FOREIGN KEY(_id_sort) REFERENCES sort(_id),
    FOREIGN KEY(_id_level) REFERENCES level(_id)
    );""")

def create_table_sort(conn):
    cur = conn.cursor()
    cur.execute( """
    CREATE TABLE IF NOT EXISTS sort (
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
    );""")


def insert_component(conn):
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO component (_id, name)
    VALUES
    (1, 'V'),
    (2, 'S'),
    (3, 'F'),
    (4, 'M'),
    (5, 'DF'),
    (6, 'F/DF'),
    (7, 'M/DF');
    """)


def insert_level(conn):
    cur = conn.cursor()
    cur.execute("""
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
    """)


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
        

def main():
    database = "sorts.db"

    # create a database connection
    conn = create_connection(database)

    #setup the database
    if conn is not None:
        exec_sql(conn, """DELETE FROM sort""")
        exec_sql(conn, """DELETE FROM sort_component""")
        exec_sql(conn, """DELETE FROM sort_level""")
        exec_sql(conn, """DELETE FROM component""")
        exec_sql(conn, """DELETE FROM level""")
        create_table_component(conn)
        create_table_level(conn)
        create_table_sort_component(conn)
        create_table_sort_level(conn)
        create_table_sort(conn)
        insert_component(conn)
        insert_level(conn)

    else:
        print("Error! cannot create the database connection.")

    # Load json
    sorts = json.load(open('allSorts.json'))
    
    print "Number of spell " + str(len(sorts))

    with conn:
        component = select_all_component(conn)
        level = select_all_level(conn)
        
    #update table sorts
    for sort in sorts:  
        print "Insert spell : ",sort["_id"]
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
        
        #update table sort_level, we use the function find_classe to have the connection between a classe and its id
        for classe in sort["levels"]:
            idClasse = find_classe(classe["class"], level)
            row_sort_level= [sort["_id"],
                            idClasse,
                            classe["level"]]
            conn.execute('INSERT INTO sort_level(_id_sort, _id_level, _value) VALUES(?, ?, ?)', row_sort_level)
            
        #update table sort_component, we use the function find_comp to have the connection between a component and its id
        for comp in sort["components"]:
            idComp = find_comp(comp, component)
            row_sort_component = [sort["_id"],
                                  idComp]
            conn.execute('INSERT INTO sort_component(_id_sort, _id_component) VALUES(?, ?)', row_sort_component)
            
    conn.commit()

if __name__ == '__main__':
    main()

