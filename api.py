from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from flask_cors import CORS
import uuid
from datetime import date
from db import get_connection
import random
import string
from decimal import Decimal

app = Flask(__name__)
CORS(app)
api = Api(app)

RANKS = [
    (100, "Genius"),
    (75, "Amazing"),
    (50, "Great"),
    (10, "Good"),
    (0, "Beginner")
]

def calculate_score(word, all_letters):
    points = 0
    is_pangram = len(set(word)) == len(set(all_letters))
    if len(word) == 4:
        points = 1
    elif len(word) > 4:
        points = len(word)
    if is_pangram:
        points += 7
    return points, is_pangram

def get_rank(total_points):
    for threshold, label in RANKS:
        if total_points >= threshold:
            return label
    return "Beginner"

class DailyLetters(Resource):
    def get(self):
        today = date.today()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT letters, center_letter FROM daily_letters WHERE game_date = %s", (today,))
        result = cursor.fetchone()

        if not result:
            letters = random.sample(string.ascii_lowercase, 7)
            center_letter = random.choice(letters)
            cursor.execute("INSERT INTO daily_letters (game_date, letters, center_letter) VALUES (%s, %s, %s)",
                           (today, ''.join(letters), center_letter))
            conn.commit()
            result = (''.join(letters), center_letter)

        cursor.close()
        conn.close()
        return {"letters": result[0], "center_letter": result[1]}

class CreateSession(Resource):
    def get(self):
        session_id = str(uuid.uuid4())
        today = date.today()
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT letters, center_letter FROM daily_letters WHERE game_date = %s", (today,))
        result = cursor.fetchone()
        if not result:
            cursor.close()
            conn.close()
            return {"error": "Daily letters not initialized"}, 500

        cursor.execute("INSERT INTO game_sessions (session_id, game_date) VALUES (%s, %s)", (session_id, today))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            "session_id": session_id,
            "letters": result[0],
            "center_letter": result[1]
        }

class CheckWord(Resource):
    def post(self):
        data = request.get_json()
        word = data.get("word", "").lower().strip()
        session_id = data.get("session_id", "").strip()
        all_letters = data.get("all_letters", "").lower().strip()
        center_letter = data.get("center_letter", "").lower().strip()

        if not word or not session_id or not center_letter:
            return {"error": "Missing required data"}, 400
        if len(word) < 4:
            return {"valid": False, "message": "Too short"}
        if center_letter not in word:
            return {"valid": False, "message": "Doesn't contain center letter"}

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT 1 FROM game_sessions WHERE session_id = %s", (session_id,))
        if cursor.fetchone() is None:
            cursor.close()
            conn.close()
            return {"error": "Invalid session ID"}, 400

        cursor.execute("SELECT 1 FROM valid_words WHERE word = %s", (word,))
        if cursor.fetchone() is None:
            cursor.close()
            conn.close()
            return {"valid": False, "message": "Invalid word"}

        cursor.execute("SELECT 1 FROM guesses WHERE session_id = %s AND word = %s", (session_id, word))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return {"valid": False, "message": "Already found"}

        points, is_pangram = calculate_score(word, all_letters)
        cursor.execute(
            "INSERT INTO guesses (session_id, word, is_valid, points) VALUES (%s, %s, %s, %s)",
            (session_id, word, True, points)
        )

        cursor.execute("SELECT COUNT(*), SUM(points) FROM guesses WHERE session_id = %s", (session_id,))
        count, total_score = cursor.fetchone()
        total_score = total_score or 0
        rank = get_rank(total_score)

        cursor.close()
        conn.commit()
        conn.close()

        return {
    "valid": True,
    "message": "Pangram!!" if is_pangram else "Valid word!",
    "points_awarded": int(points) if isinstance(points, Decimal) else points,
    "total_score": int(total_score) if isinstance(total_score, Decimal) else total_score,
    "rank": rank,
    "words_found": count
}

class RestartSession(Resource):
    def post(self):
        data = request.get_json()
        session_id = data.get("session_id", "").strip()
        if not session_id:
            return {"error": "Missing session_id"}, 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM guesses WHERE session_id = %s", (session_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Game restarted. All guesses cleared."}

api.add_resource(DailyLetters, "/daily_letters")
api.add_resource(CreateSession, "/create_session")
api.add_resource(CheckWord, "/check_word")
api.add_resource(RestartSession, "/restart_session")

if __name__ == "__main__":
    app.run(port=8001)
