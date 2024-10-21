import mysql.connector
import os

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password = os.environ.get("MYSQL_PASS"),
    database = "nicholasdatabase"
)

my_cursor = mydb.cursor()

my_cursor.execute("SELECT * FROM TABLE books")