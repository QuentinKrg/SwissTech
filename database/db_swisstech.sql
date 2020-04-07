-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.4.11-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
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
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ZIP` int(10) NOT NULL,
  `FK_AddressType` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  PRIMARY KEY (`id_Address`),
  KEY `FK_Address_AddressType` (`FK_AddressType`),
  KEY `FK_Address_Customer` (`FK_Customer`),
  CONSTRAINT `FK_Address_AddressType` FOREIGN KEY (`FK_AddressType`) REFERENCES `t_addresstypes` (`id_AddressType`),
  CONSTRAINT `FK_Address_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_address : ~4 rows (environ)
/*!40000 ALTER TABLE `t_address` DISABLE KEYS */;
INSERT INTO `t_address` (`id_Address`, `Address`, `City`, `ZIP`, `FK_AddressType`, `FK_Customer`) VALUES
	(13, 'Couloir 7 , 717', 'Lausanne', 1004, 1, 24),
	(14, 'Couloir 7 , 717', 'Lausanne', 1004, 2, 24),
	(15, 'Rue de test, 9', 'Test Ville', 1000, 1, 25),
	(16, 'Rue de test, 10', 'Test Ville', 1000, 2, 25);
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

-- Listage des données de la table db_swisstech.t_comments : ~23 rows (environ)
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
	(21, 'adieu pénis', '2020-04-02 09:19:40', 1, 4, 25),
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
  `CustomerTitre` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerLastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerBirthday` date NOT NULL,
  `FK_ShoppingCart` int(11) DEFAULT NULL,
  `CustomerSince` date DEFAULT curdate(),
  PRIMARY KEY (`id_customer`),
  KEY `FK_Customer_ShoppingCart` (`FK_ShoppingCart`),
  CONSTRAINT `FK_Customer_ShoppingCart` FOREIGN KEY (`FK_ShoppingCart`) REFERENCES `t_shoppingcart` (`id_ShoppingCart`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_customers : ~3 rows (environ)
/*!40000 ALTER TABLE `t_customers` DISABLE KEYS */;
INSERT INTO `t_customers` (`id_customer`, `CustomerTitre`, `CustomerName`, `CustomerLastName`, `CustomerPhone`, `CustomerEmail`, `CustomerBirthday`, `FK_ShoppingCart`, `CustomerSince`) VALUES
	(24, 'Mme', 'Chippo', 'Lata', '+4171237654', 'lapute@gmail.com', '1890-01-01', NULL, '2020-03-18'),
	(25, 'Mme', 'Test ', 'Testttt', '+41 9999 9999 99', 'testttt@swisstchstore.com', '1999-01-01', NULL, '2020-03-18'),
	(26, 'Mr', 'cookie', 'Lechat', '234565453423', 'cookier@gmail.com', '2012-01-01', NULL, '2020-03-18');
/*!40000 ALTER TABLE `t_customers` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_images
CREATE TABLE IF NOT EXISTS `t_images` (
  `id_Image` int(11) NOT NULL AUTO_INCREMENT,
  `ImageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Image`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_images : ~7 rows (environ)
/*!40000 ALTER TABLE `t_images` DISABLE KEYS */;
INSERT INTO `t_images` (`id_Image`, `ImageName`, `ImagePath`) VALUES
	(1, 'PS4 - std - black', 'Sony-Playstation-4-Slim-1TB-Black.jpg'),
	(2, 'Nintendo Switch - red-blue', 'Nintendo-Switch-.jpg'),
	(3, 'Laptop HP 250 G7 - Noir', 'Laptop-HP-250-G7-Black.png'),
	(4, 'iPad Silver 32 Go', 'iPad-7th-Silver.jpg'),
	(5, 'Macbook Pro - silver', 'Macbook-Pro-13.jpg'),
	(6, 'AirPods -std', 'img-article-temp.jpg'),
	(7, 'Souris Logitehc B100', 'Logitech-Maus-B100.jpg');
/*!40000 ALTER TABLE `t_images` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_orders : ~5 rows (environ)
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
	(47, '2020-04-07 08:43:13', 1, 1, 25),
	(48, '2020-04-07 08:56:13', 1, 1, 25);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_paymentcustomer : ~0 rows (environ)
/*!40000 ALTER TABLE `t_paymentcustomer` DISABLE KEYS */;
INSERT INTO `t_paymentcustomer` (`id_Payment`, `CardNumber`, `CardName`, `CardCode`, `ExpiringDate`, `FK_Customer`, `FK_Order`) VALUES
	(5, '7894 4567 4567 4569', 'Quentin Krenger', 132, '2024-03-01', 25, 48);
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
  `ProductColor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductSize` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductUnitPrice` decimal(6,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL,
  `FK_Category` int(11) DEFAULT NULL,
  `FK_Manufacturer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Product`),
  KEY `FK_Product_Category` (`FK_Category`),
  KEY `FK_Product_Manufacturer` (`FK_Manufacturer`),
  CONSTRAINT `FK_Product_Category` FOREIGN KEY (`FK_Category`) REFERENCES `t_categories` (`id_Category`),
  CONSTRAINT `FK_Product_Manufacturer` FOREIGN KEY (`FK_Manufacturer`) REFERENCES `t_manufacturers` (`id_Manufacturer`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products : ~10 rows (environ)
/*!40000 ALTER TABLE `t_products` DISABLE KEYS */;
INSERT INTO `t_products` (`id_Product`, `ProductName`, `ProductColor`, `ProductSize`, `ProductDescription`, `ProductUnitPrice`, `isActive`, `FK_Category`, `FK_Manufacturer`) VALUES
	(4, 'PS4 Pro 1 TB ', 'Noir', '30cm', '1 Contrôleur compris', 419.00, 1, 44, 17),
	(6, 'Ordinateur portable 250 G7 ', 'Noir/Gris', '50cm', '-Processeur Celeron 3867U - Mémoire vive intégrée: 4GB - Disque dûr: 500GB - Ecran 15.6"', 299.00, 1, 23, 2),
	(7, 'MacBook Pro 13" 2019 Touch Bar', 'Argenté', '40cm', '- Processeur: Intel Core i5-8xxx - Mémoire vive intégrée: 8GB - Disque dûr: 128 GB - Ecran: 13.3"', 1379.00, 1, 23, 3),
	(8, 'Ordinateur portabe V130-15', 'Noir', '50cm', '-Processeur: Intel Core i3-7020U - Mémoire vive: 4GB - Disque dûr: 256 GB - Ecran: 15.6 " ', 369.00, 1, 23, 5),
	(9, 'Nintendo Switch  ', 'Rouge/Bleu', '20cm', 'Modèle révisé HAC-001-01 avec révision du matériel 2019', 349.00, 1, 44, 20),
	(10, 'Xbox One S All-Digital Edition 1 To', 'Blanc', '30cm', 'Edition standard', 259.00, 1, 44, 9),
	(11, 'iPad 7th Gen. Wifi 32 Go', 'Gris', '20cm', 'Ecran: 10.2 "  - Mémoire totale: 32 GB - Système d\'exploitation: iPadOS - Bluetooth', 379.00, 1, 24, 3),
	(12, 'Tablette Galaxy Tab A (2019) SM-T290 32 GB', 'Noir', '18cm', 'Ecran 8 " - Mémoire totale: 32 GB - Système d\'exploitation: Android - Bluetooth', 159.00, 1, 24, 4),
	(13, 'Souris B100 Optical', 'Noir', '5cm', 'Type: standard - Molette: Oui - Câble: Oui - Interface: USB', 9.00, 1, 29, 15),
	(14, 'Écouteurs intra-auriculaires Wireless AirPods Pro Blanc', 'Blanc', '4cm', 'Casque d\'écoute Bluetooth avec annulation active du bruit pour les appareils Apple', 279.00, 1, 13, 3);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_images : ~7 rows (environ)
/*!40000 ALTER TABLE `t_products_images` DISABLE KEYS */;
INSERT INTO `t_products_images` (`id_Product_Image`, `FK_Product`, `FK_Image`) VALUES
	(1, 4, 1),
	(2, 7, 5),
	(3, 9, 2),
	(4, 6, 3),
	(5, 11, 4),
	(6, 14, 6),
	(7, 13, 7);
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_orders : ~6 rows (environ)
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
	(61, 1, 9.00, 13, 48, NULL);
/*!40000 ALTER TABLE `t_products_orders` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_users : ~3 rows (environ)
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
INSERT INTO `t_users` (`id_user`, `Username`, `Password`, `Salt`, `Token`, `TokenValidity`, `isActive`, `IpAddress`, `FK_Role`, `FK_Customer`) VALUES
	(29, 'chippo', 'f644e430863a66c3d1c698230bf841c87e9b77bddf7d85433fda5e7c20323fca', 'monsalt', 'da50a35e082371de4347082f4854fd99', '2020-03-17 17:58:10', 1, '', 1, 24),
	(30, 'test', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', 'b31d91c5b2a7afee6fc6296a77057d76', '2020-04-05 15:13:52', 1, '', 2, 25),
	(31, 'Cookie', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '6857bc107d97310aab8131f1875d3715', '2020-03-28 11:32:00', 1, '', 1, 26);
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
