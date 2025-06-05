-- Table structure for table `guesses`

DROP TABLE IF EXISTS `guesses`;
CREATE TABLE `guesses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `session_id` VARCHAR(36) NOT NULL,
  `word` VARCHAR(100) NOT NULL,
  `is_valid` TINYINT(1) DEFAULT 1,
  `points` INT DEFAULT 0,
  `is_pangram` TINYINT(1) DEFAULT 0,
  `guessed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `guesses_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `game_sessions` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE guesses ADD COLUMN is_pangram BOOLEAN DEFAULT 0;
UNLOCK TABLES;