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


-- Listage de la structure de la base pour db_swisstech
CREATE DATABASE IF NOT EXISTS `db_swisstech` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `db_swisstech`;

-- Listage de la structure de la table db_swisstech. t_address
CREATE TABLE IF NOT EXISTS `t_address` (
  `id_Address` int(11) NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ZIP` int(10) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `FK_Title` int(11) DEFAULT NULL,
  `FK_AddressType` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  PRIMARY KEY (`id_Address`),
  KEY `FK_Address_AddressType` (`FK_AddressType`),
  KEY `FK_Address_Customer` (`FK_Customer`),
  KEY `FK_Title` (`FK_Title`),
  CONSTRAINT `FK_Address_AddressType` FOREIGN KEY (`FK_AddressType`) REFERENCES `t_addresstypes` (`id_AddressType`),
  CONSTRAINT `FK_Address_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Title` FOREIGN KEY (`FK_Title`) REFERENCES `t_titles` (`id_CustomerTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_address : ~18 rows (environ)
/*!40000 ALTER TABLE `t_address` DISABLE KEYS */;
INSERT INTO `t_address` (`id_Address`, `FullName`, `Address`, `City`, `ZIP`, `isActive`, `isDefault`, `FK_Title`, `FK_AddressType`, `FK_Customer`) VALUES
	(13, 'cookieeee', 'Couloir 7 , 717', 'Lausanne', 1004, 1, 0, 1, 1, 24),
	(14, 'cookieeee', 'Couloir 7 , 717', 'Lausanne', 1004, 1, 0, 1, 2, 24),
	(15, 'cookie', 'Rue de livraison 30', 'Livre ville', 1000, 1, 1, 1, 1, 25),
	(16, 'bill', 'address', 'city', 1000, 1, 1, 1, 2, 25),
	(25, 'cookieeee', 'test 1', 'Montreux', 1820, 1, 1, 1, 1, 26),
	(26, 'cookieeee', 'test 2', 'Montreux', 1820, 1, 1, 1, 2, 26),
	(29, 'cookieeee', 'Rue de livraison 3', 'Livre ville', 1000, 0, 0, 1, 1, 25),
	(30, 'test', 'Rue de livraison 3', 'Livre ville', 1000, 1, 0, 1, 1, 25),
	(31, 'cookieeee', 'Test tonton', 'tonVille', 1000, 1, 0, 1, 1, 24),
	(32, 'cookieeee', 'Rue du théatre 9, Casino de Montreux', 'Montreux', 1820, 1, 0, 1, 2, 25),
	(33, 'maman', 'Rue de test, 900', 'Test Ville', 1000, 1, 0, 1, 1, 25),
	(34, 'cookieeee', 'Rue de la charcr', 'Viande', 1000, 1, 0, 1, 1, 32),
	(35, 'cookieeee', 'Rue de la charcr', 'Viande', 1000, 1, 0, 1, 2, 32),
	(36, 'cookieeee', 'Rue de livraison 300', 'Livre ville', 1000, 1, 0, 1, 1, 33),
	(37, 'cookieeee', 'Rue de livraison 300', 'Livre ville', 1000, 1, 0, 1, 2, 33),
	(38, 'cookieeee', 'Rue de test, 1', 'Test Ville', 1000, 1, 0, 1, 1, 34),
	(39, 'cookieeee', 'Rue de test, 1', 'Test Ville', 1000, 1, 0, 1, 2, 34),
	(40, 'cookieeee', 'Rue du théatre 9', 'Montreux', 1820, 1, 0, 1, 1, 25),
	(41, 'Choisir une adresse', 'Rue de livraison 3000', 'Livre ville', 1000, 0, 0, 2, 1, 25);
/*!40000 ALTER TABLE `t_address` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_addresstypes
CREATE TABLE IF NOT EXISTS `t_addresstypes` (
  `id_AddressType` int(11) NOT NULL AUTO_INCREMENT,
  `AddressType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_AddressType`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_addresstypes : ~2 rows (environ)
/*!40000 ALTER TABLE `t_addresstypes` DISABLE KEYS */;
INSERT INTO `t_addresstypes` (`id_AddressType`, `AddressType`) VALUES
	(1, 'Livraison'),
	(2, 'Facturation');
/*!40000 ALTER TABLE `t_addresstypes` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_categories
CREATE TABLE IF NOT EXISTS `t_categories` (
  `id_Category` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `FK_Category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Category`),
  KEY `FK_Category_Category` (`FK_Category`),
  CONSTRAINT `FK_Category_Category` FOREIGN KEY (`FK_Category`) REFERENCES `t_categories` (`id_Category`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_categories : ~45 rows (environ)
/*!40000 ALTER TABLE `t_categories` DISABLE KEYS */;
INSERT INTO `t_categories` (`id_Category`, `CategoryName`, `isActive`, `FK_Category`) VALUES
	(3, 'IT & Multimédia', 1, NULL),
	(4, 'Ordinateurs & tablettes', 1, 3),
	(5, 'Périphériques & câbles', 1, 3),
	(6, 'Réseau & serveurs', 1, 3),
	(7, 'Composants PC', 1, 3),
	(8, 'Logiciels', 1, 3),
	(9, 'Téléphonie & gadgets', 1, 3),
	(10, 'Gaming', 1, 3),
	(11, 'Photo & vidéo', 1, 3),
	(12, 'TV & home cinéma', 1, 3),
	(13, 'Audio', 1, 3),
	(14, 'Son & éclairage', 1, 3),
	(15, 'Gadgets', 1, 3),
	(16, 'Bons & Cartes cadeaux', 1, NULL),
	(17, 'Promotions', 1, NULL),
	(18, 'Nouveautés', 1, NULL),
	(19, 'Accessoires pour ordinateurs portables', 1, 4),
	(20, 'Accessoires pour tablettes', 1, 4),
	(21, 'Liseuses', 1, 4),
	(22, 'Ordinateurs', 1, 4),
	(23, 'Ordinateurs portables', 1, 4),
	(24, 'Tablettes & 2-en-1', 1, 4),
	(25, 'Accessoires pour imprimantes & scanners', 1, 5),
	(26, 'Accessoires pour moniteurs', 1, 5),
	(27, 'Adaptateurs & commutateurs', 1, 5),
	(28, 'Boîtiers externes (lecteurs)', 1, 5),
	(29, 'Clavier & souris', 1, 5),
	(30, 'Clés USB', 1, 5),
	(31, 'Câbles', 1, 5),
	(32, 'Encres & toners', 1, 5),
	(33, 'Haut-parleurs de PC', 1, 5),
	(34, 'Hubs & lecteurs de cartes USB', 1, 5),
	(35, 'Imprimantes & scanners', 1, 5),
	(36, 'Moniteurs', 1, 5),
	(37, 'Mémoire externe', 1, 5),
	(38, 'Périphériques d\'entrée', 1, 5),
	(39, 'Tablettes graphiques', 1, 5),
	(40, 'Accessoires pour ordinateurs portables', 1, 5),
	(41, 'Casques', 1, 10),
	(42, 'Casques de RV', 1, 10),
	(43, 'Chaises de gaming', 1, 10),
	(44, 'Consoles', 1, 10),
	(45, 'Figurines', 1, 10),
	(46, 'Jeux', 1, 10),
	(47, 'périphériques d\'entrée gamers', 1, 10);
/*!40000 ALTER TABLE `t_categories` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_comments
CREATE TABLE IF NOT EXISTS `t_comments` (
  `id_Comment` int(11) NOT NULL AUTO_INCREMENT,
  `CommentValue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `CommentDate` datetime NOT NULL DEFAULT current_timestamp(),
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `FK_Product` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  PRIMARY KEY (`id_Comment`),
  KEY `FK_Comment_Product` (`FK_Product`),
  KEY `FK_Comment_Customer` (`FK_Customer`),
  CONSTRAINT `FK_Comment_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Comment_Product` FOREIGN KEY (`FK_Product`) REFERENCES `t_products` (`id_Product`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_comments : ~26 rows (environ)
/*!40000 ALTER TABLE `t_comments` DISABLE KEYS */;
INSERT INTO `t_comments` (`id_Comment`, `CommentValue`, `CommentDate`, `isActive`, `FK_Product`, `FK_Customer`) VALUES
	(2, 'test', '2020-03-29 13:22:39', 1, 9, 25),
	(3, 'un autre test', '2020-03-29 13:23:26', 1, 9, 25),
	(4, 'test', '2020-03-29 13:28:28', 1, 9, 25),
	(5, 'test ultime', '2020-03-29 13:34:15', 1, 9, 25),
	(6, 'test', '2020-03-29 13:39:22', 1, 9, 25),
	(7, 'test 6', '2020-03-29 13:49:14', 1, 9, 25),
	(8, 'test 7', '2020-03-29 13:50:49', 1, 9, 25),
	(9, 'test', '2020-03-29 15:35:40', 1, 11, 25),
	(10, 'test 2', '2020-03-29 15:37:36', 1, 11, 25),
	(13, 'adieu', '2020-04-02 08:28:10', 1, 6, 25),
	(14, 'test', '2020-04-02 08:44:27', 1, 14, 25),
	(15, 'test', '2020-04-02 09:13:47', 1, 4, 25),
	(16, 'gang gang', '2020-04-02 09:14:01', 1, 4, 25),
	(17, 'test', '2020-04-02 09:14:53', 1, 4, 25),
	(18, 'lololol', '2020-04-02 09:15:14', 1, 4, 25),
	(19, 'monstre mdr', '2020-04-02 09:15:34', 1, 4, 25),
	(20, 'gang epsic', '2020-04-02 09:16:17', 1, 4, 25),
	(21, 'adieu pénis', '2020-04-02 09:19:40', 0, 4, 25),
	(22, 'testtestsetset', '2020-04-02 09:25:20', 1, 7, 25),
	(23, 'Boule de shit', '0000-00-00 00:00:00', 0, 7, 25),
	(24, 'Boule de shit', '2020-04-02 11:30:34', 1, 7, 25),
	(25, 'Boule de shit', '2020-04-02 11:30:54', 1, 7, 25),
	(26, 'LAst tests', '2020-04-02 11:33:33', 1, 7, 25),
	(27, 'monstre commentaire', '2020-04-02 11:49:02', 1, 13, 25),
	(28, 'kikou', '2020-04-02 11:53:20', 1, 11, 25),
	(29, 'pas foufou tout ça ', '2020-04-05 15:24:04', 1, 14, 25);
/*!40000 ALTER TABLE `t_comments` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_customers
CREATE TABLE IF NOT EXISTS `t_customers` (
  `id_customer` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerLastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerBirthday` date NOT NULL,
  `FK_ShoppingCart` int(11) DEFAULT NULL,
  `CustomerSince` date DEFAULT curdate(),
  `FK_Title` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_customer`),
  KEY `FK_Customer_ShoppingCart` (`FK_ShoppingCart`),
  KEY `FK_CustomerTitle` (`FK_Title`),
  CONSTRAINT `FK_CustomerTitle` FOREIGN KEY (`FK_Title`) REFERENCES `t_titles` (`id_CustomerTitle`),
  CONSTRAINT `FK_Customer_ShoppingCart` FOREIGN KEY (`FK_ShoppingCart`) REFERENCES `t_shoppingcart` (`id_ShoppingCart`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_customers : ~6 rows (environ)
/*!40000 ALTER TABLE `t_customers` DISABLE KEYS */;
INSERT INTO `t_customers` (`id_customer`, `CustomerName`, `CustomerLastName`, `CustomerPhone`, `CustomerEmail`, `CustomerBirthday`, `FK_ShoppingCart`, `CustomerSince`, `FK_Title`) VALUES
	(24, 'Chippo', 'Lata', '+4171237654', 'lapute@gmail.com', '1890-01-01', NULL, '2020-03-18', 2),
	(25, 'test', 'testnom', '9999', 'test@email.com', '2020-05-09', NULL, '2020-03-18', 1),
	(26, 'cookie', 'testnom', '9999', 'test@email.com', '2020-05-15', NULL, '2020-03-18', 1),
	(32, 'Salami', 'Italien', '+31 222 222 222 2', 'salami@sala.com', '1000-01-01', NULL, '2020-05-13', 1),
	(33, 'Choisir', 'adresse', '+41768018510', 'test@swisstchstore.com', '2020-05-21', NULL, '2020-05-13', 2),
	(34, 'dsa', 'asda', '+41768018510', 'winstonforti@gmail.com', '2020-05-01', NULL, '2020-05-13', 3);
/*!40000 ALTER TABLE `t_customers` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_images
CREATE TABLE IF NOT EXISTS `t_images` (
  `id_Image` int(11) NOT NULL AUTO_INCREMENT,
  `ImageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Image`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_images : ~8 rows (environ)
/*!40000 ALTER TABLE `t_images` DISABLE KEYS */;
INSERT INTO `t_images` (`id_Image`, `ImageName`, `ImagePath`) VALUES
	(1, 'PS4 - std - black', 'Sony-Playstation-4-Slim-1TB-Black.jpg'),
	(2, 'Nintendo Switch - red-blue', 'Nintendo-Switch-.jpg'),
	(3, 'Laptop HP 250 G7 - Noir', 'Laptop-HP-250-G7-Black.png'),
	(4, 'iPad Silver 32 Go', 'iPad-7th-Silver.jpg'),
	(5, 'Macbook Pro - silver', 'Macbook-Pro-13.jpg'),
	(6, 'AirPods -std', 'img-article-temp.jpg'),
	(7, 'Souris Logitehc B100', 'Logitech-Maus-B100.jpg'),
	(8, 'swisstech-smartphone-logo', 'Swisstech-smartphone-logo.png');
/*!40000 ALTER TABLE `t_images` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_lock_customer
CREATE TABLE IF NOT EXISTS `t_lock_customer` (
  `id_lock_customer` int(11) NOT NULL AUTO_INCREMENT,
  `LockedBy` varchar(50) NOT NULL,
  `LockTime` time NOT NULL DEFAULT current_timestamp(),
  `FK_Customer` int(11) NOT NULL,
  PRIMARY KEY (`id_lock_customer`),
  KEY `FK_Customer` (`FK_Customer`),
  CONSTRAINT `FK_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table db_swisstech.t_lock_customer : ~0 rows (environ)
/*!40000 ALTER TABLE `t_lock_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_lock_customer` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_lock_product
CREATE TABLE IF NOT EXISTS `t_lock_product` (
  `id_lock_product` int(11) NOT NULL AUTO_INCREMENT,
  `LockedBy` varchar(50) NOT NULL,
  `LockTime` time NOT NULL DEFAULT curtime(),
  `FK_Product` int(11) NOT NULL,
  PRIMARY KEY (`id_lock_product`),
  KEY `FK_product` (`FK_Product`),
  CONSTRAINT `FK_product` FOREIGN KEY (`FK_Product`) REFERENCES `t_products` (`id_Product`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table db_swisstech.t_lock_product : ~0 rows (environ)
/*!40000 ALTER TABLE `t_lock_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_lock_product` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_manufacturers
CREATE TABLE IF NOT EXISTS `t_manufacturers` (
  `id_Manufacturer` int(11) NOT NULL AUTO_INCREMENT,
  `ManufacturerName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Manufacturer`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_manufacturers : ~19 rows (environ)
/*!40000 ALTER TABLE `t_manufacturers` DISABLE KEYS */;
INSERT INTO `t_manufacturers` (`id_Manufacturer`, `ManufacturerName`) VALUES
	(2, 'HP'),
	(3, 'Apple'),
	(4, 'Samsung'),
	(5, 'Lenovo'),
	(6, 'Acer'),
	(7, 'Asus'),
	(8, 'Dell'),
	(9, 'Microsoft'),
	(10, 'Intel'),
	(11, 'Belkin'),
	(12, 'Epson'),
	(13, 'Canon'),
	(14, 'Nikon'),
	(15, 'Logitech'),
	(16, 'TP-Link'),
	(17, 'Sony'),
	(18, 'Huawei'),
	(19, 'Xiaomi'),
	(20, 'Nintendo');
/*!40000 ALTER TABLE `t_manufacturers` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_orders
CREATE TABLE IF NOT EXISTS `t_orders` (
  `id_Order` int(11) NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `FK_Status` int(11) NOT NULL DEFAULT 1,
  `FK_PaymentMethod` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  PRIMARY KEY (`id_Order`),
  KEY `FK_Order_Status` (`FK_Status`),
  KEY `FK_Order_Customer` (`FK_Customer`),
  KEY `FK_Order_PaymentMethod` (`FK_PaymentMethod`),
  CONSTRAINT `FK_Order_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Order_PaymentMethod` FOREIGN KEY (`FK_PaymentMethod`) REFERENCES `t_paymentmethod` (`id_paymentmethod`),
  CONSTRAINT `FK_Order_Status` FOREIGN KEY (`FK_Status`) REFERENCES `t_status` (`id_Status`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_orders : ~18 rows (environ)
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` (`id_Order`, `OrderDate`, `FK_Status`, `FK_PaymentMethod`, `FK_Customer`) VALUES
	(37, '2020-04-05 15:21:36', 1, 2, 25),
	(38, '2020-04-05 15:24:47', 1, 2, 25),
	(39, '2020-04-07 08:11:01', 1, 2, 25),
	(40, '2020-04-07 08:13:58', 1, 1, 25),
	(41, '2020-04-07 08:17:01', 1, 1, 25),
	(42, '2020-04-07 08:37:50', 1, 1, 25),
	(43, '2020-04-07 08:40:50', 1, 1, 25),
	(44, '2020-04-07 08:41:35', 1, 1, 25),
	(45, '2020-04-07 08:42:03', 1, 1, 25),
	(46, '2020-04-07 08:42:26', 1, 1, 25),
	(47, '2020-04-07 08:43:13', 3, 1, 25),
	(48, '2020-04-07 08:56:13', 1, 1, 25),
	(49, '2020-04-07 10:10:01', 6, 1, 25),
	(50, '2020-04-07 10:30:24', 5, 2, 25),
	(51, '2020-04-08 12:23:13', 3, 1, 25),
	(52, '2020-04-14 14:54:11', 2, 2, 24),
	(53, '2020-04-14 14:54:41', 4, 2, 24),
	(54, '2020-05-11 07:58:35', 1, 2, 26);
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_parameters
CREATE TABLE IF NOT EXISTS `t_parameters` (
  `id_Parameter` int(11) NOT NULL AUTO_INCREMENT,
  `ParameterType` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParameterKey` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParameterValue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_Parameter`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_parameters : ~0 rows (environ)
/*!40000 ALTER TABLE `t_parameters` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_parameters` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_paymentcustomer
CREATE TABLE IF NOT EXISTS `t_paymentcustomer` (
  `id_Payment` int(11) NOT NULL AUTO_INCREMENT,
  `CardNumber` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CardName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CardCode` int(3) NOT NULL,
  `ExpiringDate` date NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  `FK_Order` int(11) NOT NULL,
  PRIMARY KEY (`id_Payment`),
  KEY `FK_Payment_Customer` (`FK_Customer`),
  KEY `FK_Payment_Order` (`FK_Order`),
  CONSTRAINT `FK_Payment_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Payment_Order` FOREIGN KEY (`FK_Order`) REFERENCES `t_orders` (`id_Order`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_paymentcustomer : ~3 rows (environ)
/*!40000 ALTER TABLE `t_paymentcustomer` DISABLE KEYS */;
INSERT INTO `t_paymentcustomer` (`id_Payment`, `CardNumber`, `CardName`, `CardCode`, `ExpiringDate`, `FK_Customer`, `FK_Order`) VALUES
	(5, '7894 4567 4567 4569', 'Quentin Krenger', 132, '2024-03-01', 25, 48),
	(6, '2345 6789 0555 5555', 'test test', 0, '2023-02-01', 25, 49),
	(7, '8789 8776 6555 6777', 'Winston Meisen', 0, '2020-01-01', 25, 51);
/*!40000 ALTER TABLE `t_paymentcustomer` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_paymentmethod
CREATE TABLE IF NOT EXISTS `t_paymentmethod` (
  `id_paymentmethod` int(11) NOT NULL AUTO_INCREMENT,
  `MethodName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MethodCode` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_paymentmethod`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_paymentmethod : ~2 rows (environ)
/*!40000 ALTER TABLE `t_paymentmethod` DISABLE KEYS */;
INSERT INTO `t_paymentmethod` (`id_paymentmethod`, `MethodName`, `MethodCode`) VALUES
	(1, 'Carte de crédit', 'CC'),
	(2, 'Facture', 'FAC');
/*!40000 ALTER TABLE `t_paymentmethod` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_products
CREATE TABLE IF NOT EXISTS `t_products` (
  `id_Product` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductSize` int(11) NOT NULL DEFAULT 0,
  `ProductDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductUnitPrice` decimal(6,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL,
  `FK_Category` int(11) NOT NULL,
  `FK_Manufacturer` int(11) NOT NULL,
  `FK_ProductColor` int(11) NOT NULL,
  PRIMARY KEY (`id_Product`),
  KEY `FK_Product_Category` (`FK_Category`),
  KEY `FK_Product_Manufacturer` (`FK_Manufacturer`),
  KEY `FK_Color` (`FK_ProductColor`),
  CONSTRAINT `FK_Product_Category` FOREIGN KEY (`FK_Category`) REFERENCES `t_categories` (`id_Category`),
  CONSTRAINT `FK_Product_Color` FOREIGN KEY (`FK_ProductColor`) REFERENCES `t_product_color` (`id_color`),
  CONSTRAINT `FK_Product_Manufacturer` FOREIGN KEY (`FK_Manufacturer`) REFERENCES `t_manufacturers` (`id_Manufacturer`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products : ~10 rows (environ)
/*!40000 ALTER TABLE `t_products` DISABLE KEYS */;
INSERT INTO `t_products` (`id_Product`, `ProductName`, `ProductSize`, `ProductDescription`, `ProductUnitPrice`, `isActive`, `FK_Category`, `FK_Manufacturer`, `FK_ProductColor`) VALUES
	(4, 'PS4 Pro 1 To', 30, '1 manette comprise', 419.00, 1, 44, 17, 8),
	(6, 'Ordinateur portable 250 G7 ', 50, '-Processeur Celeron 3867U - Mémoire vive intégrée: 4GB - Disque dûr: 500GB - Ecran 15.6"', 299.00, 1, 23, 2, 8),
	(7, 'MacBook Pro 13" 2019 Touch Bar', 40, '<ul><li>Processeur: Intel Core i5-8xxx&nbsp;</li><li> Mémoire vive intégrée: 8GB&nbsp;</li><li> Disque dûr: 128 GB&nbsp;</li><li> Ecran: 13.3"</li></ul>', 1379.00, 1, 23, 3, 9),
	(8, 'Ordinateur portabe V130-15', 50, '-Processeur: Intel Core i3-7020U - Mémoire vive: 4GB - Disque dûr: 256 GB - Ecran: 15.6 " ', 369.00, 1, 23, 5, 8),
	(9, 'Nintendo Switch  ', 20, 'Modèle révisé HAC-001-01 avec révision du matériel 2019', 349.00, 1, 44, 20, 10),
	(10, 'Xbox One S All-Digital Edition 1 To', 30, 'Edition standard', 259.00, 1, 44, 9, 7),
	(11, 'iPad 7th Gen. Wifi 32 Go', 20, 'Ecran: 10.2 "  - Mémoire totale: 32 GB - Système d\'exploitation: iPadOS - Bluetooth', 379.00, 1, 24, 3, 9),
	(12, 'Tablette Galaxy Tab A (2019) SM-T290 32 GB', 18, 'Ecran 8 " - Mémoire totale: 32 GB - Système d\'exploitation: Android - Bluetooth', 159.00, 1, 24, 4, 8),
	(13, 'Souris B100 Optical', 5, 'Type: standard - Molette: Oui - Câble: Oui - Interface: USB', 9.00, 1, 29, 15, 8),
	(14, 'Écouteurs intra-auriculaires Wireless AirPods Pro Blanc', 4, 'Casque d\'écoute Bluetooth avec annulation active du bruit pour les appareils Apple', 279.00, 1, 13, 3, 7);
/*!40000 ALTER TABLE `t_products` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_products_images
CREATE TABLE IF NOT EXISTS `t_products_images` (
  `id_Product_Image` int(11) NOT NULL AUTO_INCREMENT,
  `FK_Product` int(11) NOT NULL,
  `FK_Image` int(11) NOT NULL,
  PRIMARY KEY (`id_Product_Image`),
  KEY `FK_ProductImage_Image` (`FK_Image`),
  KEY `FK_ProductImage_Product` (`FK_Product`),
  CONSTRAINT `FK_ProductImage_Image` FOREIGN KEY (`FK_Image`) REFERENCES `t_images` (`id_Image`),
  CONSTRAINT `FK_ProductImage_Product` FOREIGN KEY (`FK_Product`) REFERENCES `t_products` (`id_Product`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_images : ~9 rows (environ)
/*!40000 ALTER TABLE `t_products_images` DISABLE KEYS */;
INSERT INTO `t_products_images` (`id_Product_Image`, `FK_Product`, `FK_Image`) VALUES
	(1, 4, 2),
	(2, 7, 5),
	(3, 9, 2),
	(4, 6, 3),
	(5, 11, 4),
	(6, 14, 6),
	(7, 13, 7),
	(19, 30, 1),
	(20, 32, 8);
/*!40000 ALTER TABLE `t_products_images` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_products_orders
CREATE TABLE IF NOT EXISTS `t_products_orders` (
  `id_Product_Order` int(11) NOT NULL AUTO_INCREMENT,
  `Quantity` int(4) NOT NULL,
  `CourantUnitPrice` decimal(6,2) DEFAULT NULL,
  `FK_Product` int(11) NOT NULL,
  `FK_Order` int(11) DEFAULT NULL,
  `FK_ShoppingCart` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Product_Order`),
  KEY `FK_ProductOrder_ShoppingCart` (`FK_ShoppingCart`),
  KEY `FK_ProductOrder_Order` (`FK_Order`),
  KEY `FK_ProductOrder_Product` (`FK_Product`),
  CONSTRAINT `FK_ProductOrder_Order` FOREIGN KEY (`FK_Order`) REFERENCES `t_orders` (`id_Order`),
  CONSTRAINT `FK_ProductOrder_Product` FOREIGN KEY (`FK_Product`) REFERENCES `t_products` (`id_Product`),
  CONSTRAINT `FK_ProductOrder_ShoppingCart` FOREIGN KEY (`FK_ShoppingCart`) REFERENCES `t_shoppingcart` (`id_ShoppingCart`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_orders : ~24 rows (environ)
/*!40000 ALTER TABLE `t_products_orders` DISABLE KEYS */;
INSERT INTO `t_products_orders` (`id_Product_Order`, `Quantity`, `CourantUnitPrice`, `FK_Product`, `FK_Order`, `FK_ShoppingCart`) VALUES
	(51, 3, 1379.00, 7, 37, NULL),
	(52, 2, 379.00, 11, 37, NULL),
	(53, 2, 419.00, 4, 38, NULL),
	(54, 1, 1379.00, 7, 39, NULL),
	(55, 1, 379.00, 11, 40, NULL),
	(56, 1, 299.00, 6, 41, NULL),
	(57, 1, 349.00, 9, 42, NULL),
	(58, 1, 419.00, 4, 43, NULL),
	(59, 1, 419.00, 4, 46, NULL),
	(60, 1, 419.00, 4, 47, NULL),
	(61, 1, 9.00, 13, 48, NULL),
	(62, 1, 279.00, 14, 49, NULL),
	(63, 1, 379.00, 11, 50, NULL),
	(64, 1, 349.00, 9, 50, NULL),
	(65, 1, 1379.00, 7, 51, NULL),
	(66, 1, 279.00, 14, 51, NULL),
	(67, 1, 419.00, 4, 51, NULL),
	(68, 2, 379.00, 11, 52, NULL),
	(69, 1, 279.00, 14, 53, NULL),
	(70, 2, 349.00, 9, 53, NULL),
	(71, 1, 369.00, 8, 54, NULL),
	(72, 1, 1379.00, 7, 54, NULL),
	(73, 1, 349.00, 9, 54, NULL),
	(74, 1, 419.00, 4, 54, NULL);
/*!40000 ALTER TABLE `t_products_orders` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_product_color
CREATE TABLE IF NOT EXISTS `t_product_color` (
  `id_color` int(11) NOT NULL AUTO_INCREMENT,
  `ProductColor` varchar(50) NOT NULL,
  PRIMARY KEY (`id_color`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table db_swisstech.t_product_color : ~10 rows (environ)
/*!40000 ALTER TABLE `t_product_color` DISABLE KEYS */;
INSERT INTO `t_product_color` (`id_color`, `ProductColor`) VALUES
	(1, 'Bleu'),
	(2, 'Vert'),
	(3, 'Rouge'),
	(4, 'Jaune'),
	(5, 'Orange'),
	(6, 'Rose'),
	(7, 'Blanc'),
	(8, 'Noir'),
	(9, 'Argenté'),
	(10, 'Rouge/Bleu');
/*!40000 ALTER TABLE `t_product_color` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_roles
CREATE TABLE IF NOT EXISTS `t_roles` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_roles : ~2 rows (environ)
/*!40000 ALTER TABLE `t_roles` DISABLE KEYS */;
INSERT INTO `t_roles` (`id_role`, `RoleName`, `RoleCode`) VALUES
	(1, 'Standart', 'ST'),
	(2, 'Administrator', 'AD');
/*!40000 ALTER TABLE `t_roles` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_rss
CREATE TABLE IF NOT EXISTS `t_rss` (
  `Title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Link` int(20) NOT NULL DEFAULT 0,
  `Guid` int(50) NOT NULL DEFAULT -1,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PubDate` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_rss : ~3 rows (environ)
/*!40000 ALTER TABLE `t_rss` DISABLE KEYS */;
INSERT INTO `t_rss` (`Title`, `Link`, `Guid`, `Description`, `PubDate`) VALUES
	('Ceci est une ps5', 30, 1588928129, 'WOOOOAW', '2020-05-08 10:55:29'),
	('XBOXZZZZ', 31, 1588928184, 'MOnstre xbox des familles super cool tmtc 78', '2020-05-08 10:56:24'),
	('ICON SWISSTECH99', 32, 1588928765, 'test icon wet', '2020-05-08 11:06:05');
/*!40000 ALTER TABLE `t_rss` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_shoppingcart
CREATE TABLE IF NOT EXISTS `t_shoppingcart` (
  `id_ShoppingCart` int(11) NOT NULL AUTO_INCREMENT,
  `ShoppingCartDate` datetime NOT NULL,
  PRIMARY KEY (`id_ShoppingCart`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_shoppingcart : ~0 rows (environ)
/*!40000 ALTER TABLE `t_shoppingcart` DISABLE KEYS */;
INSERT INTO `t_shoppingcart` (`id_ShoppingCart`, `ShoppingCartDate`) VALUES
	(1, '2020-03-20 11:53:53');
/*!40000 ALTER TABLE `t_shoppingcart` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_status
CREATE TABLE IF NOT EXISTS `t_status` (
  `id_Status` int(11) NOT NULL AUTO_INCREMENT,
  `StatusName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Status`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_status : ~6 rows (environ)
/*!40000 ALTER TABLE `t_status` DISABLE KEYS */;
INSERT INTO `t_status` (`id_Status`, `StatusName`) VALUES
	(1, 'Validation en cours'),
	(2, 'Préparation en cours'),
	(3, 'Livraison'),
	(4, 'Livré'),
	(5, 'Annulé'),
	(6, 'Erreur de paiement');
/*!40000 ALTER TABLE `t_status` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_titles
CREATE TABLE IF NOT EXISTS `t_titles` (
  `id_CustomerTitle` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerTitle` varchar(3) NOT NULL,
  PRIMARY KEY (`id_CustomerTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table db_swisstech.t_titles : ~2 rows (environ)
/*!40000 ALTER TABLE `t_titles` DISABLE KEYS */;
INSERT INTO `t_titles` (`id_CustomerTitle`, `CustomerTitle`) VALUES
	(1, 'Mr'),
	(2, 'Mme'),
	(3, 'NB');
/*!40000 ALTER TABLE `t_titles` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_users
CREATE TABLE IF NOT EXISTS `t_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Salt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TokenValidity` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `IpAddress` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FK_Role` int(11) NOT NULL DEFAULT 1,
  `FK_Customer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `Username` (`Username`),
  KEY `FK_Users_Customers` (`FK_Customer`),
  KEY `FK_Users_Roles` (`FK_Role`),
  CONSTRAINT `FK_Users_Customers` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Users_Roles` FOREIGN KEY (`FK_Role`) REFERENCES `t_roles` (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_users : ~5 rows (environ)
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
INSERT INTO `t_users` (`id_user`, `Username`, `Password`, `Salt`, `Token`, `TokenValidity`, `isActive`, `IpAddress`, `FK_Role`, `FK_Customer`) VALUES
	(29, 'chippo', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '4c2ca7e31c52b564f8c5ca5a3fef68bb', '2020-05-08 10:40:56', 1, '127.0.0.1', 2, 24),
	(30, 'test', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '0954da2fa67cfbb221ac820b5c1e2f55', '2020-05-16 13:27:14', 1, '::1', 2, 25),
	(31, 'cookie', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '3fb4cdcfdaebf8766deb2665fd07cc64', '2020-05-16 13:26:29', 1, '::1', 2, 26),
	(36, 'salami', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', 'f27447f6c4f339639e7f045bb842cd10', '2020-05-13 15:51:24', 1, '', 1, 32),
	(37, 'rapelli', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '80f625b9e871c1d38e6397c6c3acca82', '2020-05-13 16:04:07', 1, '', 1, 33),
	(38, 'winston', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', 'edac5fb5d4552857aa458af75c0c6b8b', '2020-05-13 16:06:14', 1, '', 1, 34);
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
