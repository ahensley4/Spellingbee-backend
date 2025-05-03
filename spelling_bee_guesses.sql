-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: spelling_bee
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `guesses`
--

DROP TABLE IF EXISTS `guesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(36) DEFAULT NULL,
  `guessed_word` varchar(100) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `guesses_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `game_sessions` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guesses`
--

LOCK TABLES `guesses` WRITE;
/*!40000 ALTER TABLE `guesses` DISABLE KEYS */;
INSERT INTO `guesses` VALUES (1,'74e06fff-10dc-49ff-8eb3-f979ed080864','abbas',0),(2,'74e06fff-10dc-49ff-8eb3-f979ed080864','abbas',0),(3,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(4,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(5,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(6,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(7,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(8,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(9,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(10,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(11,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(12,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(13,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(14,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(15,'74e06fff-10dc-49ff-8eb3-f979ed080864','am',0),(16,'d1e96635-35a6-46c9-b129-038b94ab7fc2','am',0),(17,'d1e96635-35a6-46c9-b129-038b94ab7fc2','zzz',0),(18,'d1e96635-35a6-46c9-b129-038b94ab7fc2','zzz',0),(19,'d1e96635-35a6-46c9-b129-038b94ab7fc2','zzz',1);
/*!40000 ALTER TABLE `guesses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-02 17:30:26
