from flask import Flask, request, jsonify, render_template
from flask_restful import Resource, Api
from flask_cors import CORS
import uuid
from datetime import date
from db import get_connection
import random
import string
from decimal import Decimal
import os

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
            # Load curated 7-letter pangram words
            with open("tools/words.txt", "r") as f:
                pangrams = [
                    line.strip().lower()
                    for line in f
                    if len(line.strip()) == 7 and len(set(line.strip())) == 7
                ]

            chosen_word = random.choice(pangrams)
            # Only use lowercase alphabet characters
            letters = [ch for ch in set(chosen_word) if ch in string.ascii_lowercase]

            vowels = [ch for ch in letters if ch in "aeiou"]
            center_letter = random.choice(vowels) if vowels else random.choice(letters)

            if center_letter not in letters:
                letters[0] = center_letter

            random.shuffle(letters)
            full_letters = ''.join(letters)

            assert center_letter in full_letters
            assert len(full_letters) == 7

            cursor.execute(
                "INSERT INTO daily_letters (game_date, letters, center_letter) VALUES (%s, %s, %s)",
                (today, full_letters, center_letter)
            )
            conn.commit()
            result = (full_letters, center_letter)

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
            return {"error": "Daily letters not initialized"}, 500

        cursor.execute("INSERT INTO game_sessions (session_id, game_date) VALUES (%s, %s)", (session_id, today))
        conn.commit()
        cursor.close()
        conn.close()
        return {"session_id": session_id, "letters": result[0], "center_letter": result[1]}

class CheckWord(Resource):
    def post(self):
        data = request.get_json()
        word = data.get("word", "").lower()
        session_id = data.get("session_id", "")
        all_letters = data.get("all_letters", "").lower()
        center_letter = data.get("center_letter", "").lower()

        if not all([word, session_id, all_letters, center_letter]):
            return {"error": "Missing data"}, 400

        if len(word) < 4:
            return {"valid": False, "reason": "too short"}

        if center_letter not in word:
            return {"valid": False, "reason": "doesn't contain center letter"}

        if not all(c in all_letters for c in word):
            return {"valid": False, "reason": "Invalid characters in word"}

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT 1 FROM valid_words WHERE word = %s", (word,))
        if not cursor.fetchone():
            cursor.close()
            conn.close()
            return {"valid": False, "reason": "Word not in dictionary"}

        cursor.execute("SELECT 1 FROM guesses WHERE session_id = %s AND word = %s", (session_id, word))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return {"valid": False, "reason": "already guessed"}

        points, is_pangram = calculate_score(word, all_letters)

        cursor.execute("""
            INSERT INTO guesses (session_id, word, is_valid, points, is_pangram) 
            VALUES (%s, %s, %s, %s, %s)
        """, (session_id, word, True, points, is_pangram))

        cursor.execute("SELECT COUNT(*), SUM(points) FROM guesses WHERE session_id = %s", (session_id,))
        count, total_score = cursor.fetchone()
        total_score = float(total_score or 0)
        rank = get_rank(total_score)

        cursor.close()
        conn.commit()
        conn.close()

        return {
            "valid": True,
            "points": points,
            "is_pangram": is_pangram,
            "total_score": total_score,
            "words_found": count,
            "rank": rank
        }

class RestartSession(Resource):
    def post(self):
        data = request.get_json()
        session_id = data.get("session_id", "")
        if not session_id:
            return {"error": "Missing session ID"}, 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM guesses WHERE session_id = %s", (session_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"status": "Session restarted"}

class GetGuesses(Resource):
    def get(self):
        session_id = request.args.get("session_id", "")
        if not session_id:
            return {"error": "Missing session ID"}, 400

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT word FROM guesses WHERE session_id = %s", (session_id,))
        results = cursor.fetchall()
        guessed_words = [row[0] for row in results]
        cursor.close()
        conn.close()
        return {"guessed_words": guessed_words}

@app.route("/")
def serve_game():
    return render_template("Play.html")

api.add_resource(DailyLetters, "/daily_letters")
api.add_resource(CreateSession, "/create_session")
api.add_resource(CheckWord, "/check_word")
api.add_resource(RestartSession, "/restart_session")
api.add_resource(GetGuesses, "/get_guesses")

if __name__ == "__main__":
    app.run(debug=True, port=8001)
