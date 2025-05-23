# 🐝 Spelling Bee Backend

This is the backend system for the 2025 CS362 Group Project — a spelling game where users guess words made from a fixed 7-letter set each day.

---

##  Features
- Daily unique 7-letter puzzles
- Session-based gameplay and score tracking
- Pangram detection and bonus scoring
- Word validation using a local dictionary
- Restart and replay features

---

##  Requirements
- Python 3.9+
- MySQL Server 8.0+
- VS Code or any Python IDE

---

##  Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/SpellingBee-Backend.git
cd SpellingBee-Backend
```

### 2. Create and activate a virtual environment
```bash
python -m venv venv
venv\Scripts\activate     # On Windows
source venv/bin/activate    # On Mac/Linux
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up your database
- Start MySQL and create the database:
```sql
CREATE DATABASE spelling_bee;
```

- Load the schema:
```bash
mysql -u root -p spelling_bee < spelling_bee_final_backend_schema.sql
```

### 5. Configure your database connection
Copy `db.py.example` to `db.py` and update your MySQL credentials.

### 6. Load the word list
```bash
python load_words.py
```

### 7. Run the backend API
```bash
python api.py
```

The API will be available at `http://localhost:8001`.

---

##  Testing
Use Postman or the provided frontend to:
- `/create_session`
- `/check_word`
- `/restart_session`

---

##  Notes
- All users get the same letter set each calendar day.
- Scoring and rank follow project rules (Beginner → Genius).

### 5. Load the word list into the database

After setting up the `spelling_bee` database, run:

mysql -u root -p spelling_bee < valid_words.sql
