-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.4.11-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage des données de la table db_swisstech.t_orders : ~6 rows (environ)
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` (`id_Order`, `OrderDate`, `FK_Status`, `FK_PaymentMethod`, `FK_Customer`, `FK_Order_ShippingAddress`, `FK_Order_BillingAddress`) VALUES
	(37, '2020-04-05 15:21:36', 1, 2, 25, NULL, NULL),
	(38, '2020-04-05 15:24:47', 1, 2, 25, NULL, NULL),
	(39, '2020-04-07 08:11:01', 1, 2, 25, NULL, NULL),
	(40, '2020-04-07 08:13:58', 1, 1, 25, NULL, NULL),
	(41, '2020-04-07 08:17:01', 1, 1, 25, NULL, NULL),
	(42, '2020-04-07 08:37:50', 1, 1, 25, NULL, NULL),
	(43, '2020-04-07 08:40:50', 1, 1, 25, NULL, NULL),
	(44, '2020-04-07 08:41:35', 1, 1, 25, NULL, NULL),
	(45, '2020-04-07 08:42:03', 1, 1, 25, NULL, NULL),
	(46, '2020-04-07 08:42:26', 1, 1, 25, NULL, NULL),
	(47, '2020-04-07 08:43:13', 3, 1, 25, NULL, NULL),
	(48, '2020-04-07 08:56:13', 1, 1, 25, NULL, NULL),
	(49, '2020-04-07 10:10:01', 6, 1, 25, NULL, NULL),
	(50, '2020-04-07 10:30:24', 5, 2, 25, NULL, NULL),
	(51, '2020-04-08 12:23:13', 3, 1, 25, NULL, NULL),
	(52, '2020-04-14 14:54:11', 2, 2, 24, NULL, NULL),
	(53, '2020-04-14 14:54:41', 4, 2, 24, NULL, NULL),
	(54, '2020-05-11 07:58:35', 1, 2, 26, NULL, NULL),
	(55, '2020-05-20 11:20:16', 1, 2, 25, NULL, NULL);
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
