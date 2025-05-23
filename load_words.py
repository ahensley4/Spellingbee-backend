import mysql.connector
from db import get_connection

def load_words(filepath):
    conn = get_connection()
    cursor = conn.cursor()

    with open(filepath, 'r') as file:
        for line in file:
            word = line.strip()
            if word:
                try:
                    cursor.execute("INSERT IGNORE INTO valid_words (word) VALUES (%s)", (word,))
                except Exception as e:
                    print(f"Failed to insert '{word}': {e}")

    conn.commit()
    cursor.close()
    conn.close()
    print("Word list imported successfully.")

if __name__ == "__main__":
    # Adjust this if your file is in a different location
    load_words("C:/Users/aaron/Desktop/CS362/SpellingBee-Backend/words.txt")
