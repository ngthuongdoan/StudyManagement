-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: studymanagement_exp
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `username` varchar(20) NOT NULL,
  `idSubject` varchar(10) NOT NULL,
  `teacherEmail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subjectName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subjectRoom` varchar(20) NOT NULL,
  `subjectWeek` varchar(20) NOT NULL,
  `subjectDay` varchar(20) NOT NULL,
  `subjectStartRecur` date NOT NULL,
  `subjectEndRecur` date NOT NULL,
  `subjectStartTime` time NOT NULL,
  `subjectEndTime` time NOT NULL,
  `subjectTarget` varchar(4) NOT NULL,
  `subjectNote` varchar(400) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `subjectColor` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`,`idSubject`,`subjectStartTime`,`subjectEndTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES ('ngthuongdoan','CT23901','vhtram@cit.ctu.edu.vn','Niên luận','203/C1','123**678901234567**','3','2020-01-06','2020-07-18','13:30:00','16:10:00','10',NULL,'#ec823a'),('ngthuongdoan','CT24101','hxhiep@cit.ctu.edu.vn','PTYCPM','303/DB','123456','4','2020-01-06','2020-07-18','13:30:00','16:10:00','10','','#21FF3B'),('ngthuongdoan','CT24201','hxhiep@cit.ctu.edu.vn','Kiến trúc phần mềm','303/DB','123456789','1','2020-01-06','2020-07-18','13:30:00','16:10:00','10','','#F1FF5C');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-26 12:02:22
