SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS guesses;
CREATE TABLE guesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id CHAR(36),
  word VARCHAR(100),
  is_valid BOOLEAN,
  is_pangram BOOLEAN DEFAULT FALSE,
  points INT,
  guessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES game_sessions(session_id)
);

DROP TABLE IF EXISTS game_sessions;
CREATE TABLE game_sessions (
  session_id CHAR(36) PRIMARY KEY,
  game_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS daily_letters;
CREATE TABLE daily_letters (
  game_date DATE PRIMARY KEY,
  letters VARCHAR(7) NOT NULL,
  center_letter CHAR(1) NOT NULL
);
-- Stores all valid words (used only by backend)
DROP TABLE IF EXISTS valid_words;
CREATE TABLE valid_words (
  word VARCHAR(100) PRIMARY KEY
);

-- Optional analytics table for tracking group-wide performance (used for leaderboard/report)
DROP TABLE IF EXISTS report_data;
CREATE TABLE report_data (
  game_date DATE PRIMARY KEY,
  avg_words FLOAT,
  avg_points FLOAT
);
SELECT * FROM daily_letters WHERE LOCATE(center_letter, letters) = 0;

SET FOREIGN_KEY_CHECKS = 1;