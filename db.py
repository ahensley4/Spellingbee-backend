from dotenv import load_dotenv
import os
import mysql.connector


def get_connection():
    return mysql.connector.connect(
        host="127.0.0.1",  #  forces TCP
        port=3306,
        user="root",
        password="NdkLQSt1?",  # replace if needed
        database="spelling_bee"
    )


