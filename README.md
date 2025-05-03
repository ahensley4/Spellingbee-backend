# 🐝 Spellingbee Backend

This is the backend for a simple Spelling Bee game built with Flask and MySQL. It allows you to create sessions and check if a word is valid based on a preloaded word list.

---

## 📁 Project Structure

```
SpellingBee-Backend/
├── api.py               # Flask API routes
├── db.py                # MySQL connection helper
├── requirements.txt     # All necessary Python packages
├── words.txt            # Full list of valid words
├── .gitignore           # Excludes venv and other junk
```

---

## 💻 Setup Instructions (Windows + VS Code)

### 1. Clone the Repository

In your terminal:

```bash
git clone https://github.com/ahensley4/Spellingbee-backend.git
cd Spellingbee-backend
```

---

### 2. Create a Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

---

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Set Up MySQL Database

1. **Log in to MySQL:**

```bash
mysql -u root -p
```

2. **Create the database:**

```sql
CREATE DATABASE spelling_bee;
USE spelling_bee;
```

3. **Create the tables:**

```sql
CREATE TABLE valid_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(100) NOT NULL
);

CREATE TABLE game_sessions (
  session_id VARCHAR(36) PRIMARY KEY,
  start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  points INT DEFAULT 0
);

CREATE TABLE guesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(36),
  guessed_word VARCHAR(100),
  is_valid BOOLEAN,
  FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);
```

4. **Enable local file import:**

```sql
SET GLOBAL local_infile = 1;
```

5. **Load the word list:**

Replace the path with the full file path on your machine:

```sql
LOAD DATA LOCAL INFILE 'C:\\Users\\<your_username>\\Desktop\\CS362\\SpellingBee-Backend\\words.txt'
INTO TABLE valid_words
LINES TERMINATED BY '\n'
(word);
```

---

### 5. Run the Flask Backend

Make sure your virtual environment is still active:

```bash
venv\Scripts\activate
python api.py
```

---

### 6. Test with Thunder Client or Postman

#### ✅ Create a session:

```
GET http://127.0.0.1:5000/create_session
```

#### ✅ Check a word:

```
POST http://127.0.0.1:5000/check_word
Body (JSON):
{
  "session_id": "your-session-id",
  "word": "apple"
}
```

---

## 🛠️ Tech Stack

- Python 3
- Flask + Flask-RESTful
- MySQL
- Thunder Client or Postman (for testing API)