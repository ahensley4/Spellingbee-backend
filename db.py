import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="NdkLQSt1?",
        database="spelling_bee"
    )
