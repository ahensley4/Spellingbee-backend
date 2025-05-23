# 🐝 Spelling Bee Backend (CS362 Group Project)

This is the backend system for our Spelling Bee web app, built with Flask, MySQL, and RESTful APIs.

It handles:
- User session creation
- Word validation and scoring
- Daily puzzle letter generation
- Word list verification against a shared database
- Rank calculation and pangram detection

---

## 🚀 Getting Started

Follow these instructions to clone the project, set up the MySQL database, and run the backend server.

---

## 🔧 Requirements

- Python 3.11+
- MySQL Server 8.0+
- VS Code or any Python IDE

---

## 📦 Clone the Repository

```bash
git clone https://github.com/yourusername/SpellingBee-Backend.git
cd SpellingBee-Backend
```

---

## 🐍 Set Up the Python Environment

```bash
python -m venv venv
.env\Scriptsctivate
pip install -r requirements.txt
```

---

## 🛢️ Set Up the MySQL Database

### 1. Create the `spelling_bee` database manually or using Workbench

```sql
CREATE DATABASE spelling_bee;
```

### 2. Load the database schema

```bash
mysql -u root -p spelling_bee < spelling_bee_final_backend_schema.sql
```

### 3. Load the shared word list

```bash
mysql -u root -p spelling_bee < valid_words.sql
```

---

## 🗝️ Configure Your DB Connection

Copy the template file and update credentials if needed:

```bash
cp db.py.example db.py
```

In `db.py`, fill in your MySQL password if required.

---

## 🧠 Run the Backend Server

```bash
python api.py
```

The Flask server will start at:
```
http://localhost:8001
```

---

## 🔬 API Endpoints Overview

| Endpoint               | Method | Description                      |
|------------------------|--------|----------------------------------|
| `/create_session`      | GET    | Start a new game session         |
| `/check_word`          | POST   | Validate a submitted word        |
| `/restart_session`     | POST   | Reset guesses and score          |
| `/daily_letters`       | GET    | View today’s puzzle letters      |

---

## 🧪 Testing the API

Use [Thunder Client](https://www.thunderclient.com/) in VS Code or Postman.

You’ll need to:
- Fetch `/create_session`
- Use that `session_id` to POST to `/check_word`
- Verify word responses and scoring

---

## 🙋 Support

If anything doesn't work, ping Aaron in the project Slack or check for terminal errors. Most problems come from:
- Not activating the Python virtual environment
- Forgetting to load the `valid_words.sql` dump
- Typos in `db.py` configuration

---

## 👥 Contributors

- Aaron Hensley – Backend Developer
- [Teammates here]

---

## 🗂 Folder Structure

```
SpellingBee-Backend/
├── api.py                    # Flask API endpoints
├── db.py                     # MySQL connector
├── db.py.example             # DB template for teammates
├── valid_words.sql           # Word list dump (DO NOT DELETE)
├── spelling_bee_final_backend_schema.sql # DB structure
├── requirements.txt          # Python dependencies
├── README.md                 # This file
```

---

## ✅ To Do (Team)

- [ ] Add frontend integration testing
- [ ] Seed more daily letter sets
- [ ] Deploy to Render or Replit for demo access
