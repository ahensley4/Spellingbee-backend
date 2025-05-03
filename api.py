from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import uuid
from db import get_connection

app = Flask(__name__)
api = Api(app)
CORS(app)

class CreateSession(Resource):
    def get(self):
        session_id = str(uuid.uuid4())
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO game_sessions (session_id) VALUES (%s)", (session_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"session_id": session_id}, 200

class CheckWord(Resource):
    def post(self):
        data = request.get_json()
        word = data.get('word', '').lower().strip()
        session_id = data['session_id']

        conn = get_connection()
        cursor = conn.cursor()

        # DEBUG: Show word and sample DB content
        print(f"Word received: '{word}'")
        cursor.execute("SELECT word FROM valid_words LIMIT 10")
        print("Sample from valid_words:")
        for row in cursor.fetchall():
            print(repr(row[0]))

        # Case-insensitive word check
        cursor.execute("SELECT * FROM valid_words WHERE LOWER(word) = %s", (word,))
        result = cursor.fetchone()

        is_valid = result is not None

        cursor.execute("INSERT INTO guesses (session_id, guessed_word, is_valid) VALUES (%s, %s, %s)", 
                       (session_id, word, is_valid))
        conn.commit()

        cursor.close()
        conn.close()

        return {"is_valid": is_valid}, 200
    

api.add_resource(CreateSession, '/create_session')
api.add_resource(CheckWord, '/check_word')

if __name__ == '__main__':
    app.run(debug=True)