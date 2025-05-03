import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="spelling_user",
        password="password123",
        database="spelling_bee",
        allow_local_infile=True
    )