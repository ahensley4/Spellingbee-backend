-- Final Spelling Bee Schema Based on 2025GroupProject and PresentationChecklist

-- Stores all valid words (used only by backend)
DROP TABLE IF EXISTS valid_words;
CREATE TABLE valid_words (
  word VARCHAR(100) PRIMARY KEY
);

-- Stores the 7 letters for each calendar date (shared across all users)
DROP TABLE IF EXISTS daily_letters;
CREATE TABLE daily_letters (
  game_date DATE PRIMARY KEY,
  letters VARCHAR(7) NOT NULL,
  center_letter CHAR(1) NOT NULL
);

-- Tracks each user session by UUID and date
DROP TABLE IF EXISTS game_sessions;
CREATE TABLE game_sessions (
  session_id CHAR(36) PRIMARY KEY,
  game_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores each guessed word, its validity, point value, and when guessed
DROP TABLE IF EXISTS guesses;
CREATE TABLE guesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id CHAR(36),
  word VARCHAR(100),
  is_valid BOOLEAN,
  points INT,
  guessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);

-- Optional analytics table for tracking group-wide performance (used for leaderboard/report)
DROP TABLE IF EXISTS report_data;
CREATE TABLE report_data (
  game_date DATE PRIMARY KEY,
  avg_words FLOAT,
  avg_points FLOAT
);
