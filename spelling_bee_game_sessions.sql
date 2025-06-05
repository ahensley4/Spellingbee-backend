-- Table structure for table `game_sessions`

DROP TABLE IF EXISTS `game_sessions`;
CREATE TABLE `game_sessions` (
  `session_id` VARCHAR(36) NOT NULL,
  `game_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Optional: Sample session insert
INSERT INTO `game_sessions` (`session_id`, `game_date`)
VALUES 
('74e06fff-10dc-49ff-8eb3-f979ed080864', CURDATE()),
('d1e96635-35a6-46c9-b129-038b94ab7fc2', CURDATE());
