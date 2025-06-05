from db import get_connection
from mysql.connector import Error
import os

def load_sql_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        return file.read()

def main():
    try:
        print("Connecting to MySQL using db.py...")
        connection = get_connection()

        if connection.is_connected():
            print(" Connected.")
            cursor = connection.cursor()

            sql_commands = load_sql_file("spelling_bee_final_backend_schema.sql")

            for command in sql_commands.split(";"):
                cmd = command.strip()
                if cmd:
                    print(f"⏳ Executing: {cmd[:60]}...")
                    cursor.execute(cmd)

            connection.commit()
            print(" Schema loaded successfully.")

    except Error as e:
        print(f" Error: {e}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("🔌 Disconnected from MySQL.")

if __name__ == "__main__":
    main()