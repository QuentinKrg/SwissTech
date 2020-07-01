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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_address : ~35 rows (environ)
/*!40000 ALTER TABLE `t_address` DISABLE KEYS */;
INSERT INTO `t_address` (`id_Address`, `FullName`, `Address`, `City`, `ZIP`, `isActive`, `isDefault`, `FK_Title`, `FK_AddressType`, `FK_Customer`) VALUES
	(13, 'cookieeee', 'Couloir 7 , 717', 'Lausanne', 1004, 1, 0, 1, 1, 24),
	(14, 'cookieeee', 'Couloir 7 , 717', 'Lausanne', 1004, 1, 0, 1, 2, 24),
	(15, 'cookieet', 'Rue de livraison 30', 'Livre ville', 1000, 1, 1, 1, 1, 25),
	(16, 'bill', 'address', 'city', 1000, 1, 1, 1, 2, 25),
	(25, 'cookieeee', 'test 1', 'Montreux', 1820, 1, 0, 1, 1, 26),
	(26, 'cookieeee', 'test 2', 'Montreux', 1820, 1, 1, 1, 2, 26),
	(29, 'cookieeee', 'Rue de livraison 3', 'Livre ville', 1000, 0, 0, 1, 1, 25),
	(30, 'test', 'Rue de livraison 3', 'Livre ville', 1000, 1, 0, 1, 1, 25),
	(31, 'cookieeee', 'Test tonton', 'tonVille', 1000, 1, 0, 1, 1, 24),
	(32, 'cookieeee', 'Rue du théatre 9, Casino de Montreux', 'Montreux', 1820, 1, 0, 1, 2, 25),
	(33, 'maman', 'Rue de test, 900', 'Test Ville', 1000, 0, 0, 1, 1, 25),
	(34, 'cookieeee', 'Rue de la charcr', 'Viande', 1000, 1, 0, 1, 1, 32),
	(35, 'cookieeee', 'Rue de la charcr', 'Viande', 1000, 1, 0, 1, 2, 32),
	(36, 'cookieeee', 'Rue de livraison 300', 'Livre ville', 1000, 1, 0, 1, 1, 33),
	(37, 'cookieeee', 'Rue de livraison 300', 'Livre ville', 1000, 1, 0, 1, 2, 33),
	(38, 'cookieeee', 'Rue de test, 1', 'Test Ville', 1000, 1, 0, 1, 1, 34),
	(39, 'cookieeee', 'Rue de test, 1', 'Test Ville', 1000, 1, 0, 1, 2, 34),
	(40, 'cookieeee', 'Rue du théatre 9', 'Montreux', 1820, 1, 0, 1, 1, 25),
	(41, 'Choisir une adresse', 'Rue de livraison 3000', 'Livre ville', 1000, 0, 0, 2, 1, 25),
	(42, 'Quentin Test', 'Av de test', 'Lausanne', 1233, 1, 1, 2, 1, 26),
	(43, 'Test', 'Test', 'rwar§', 0, 0, 0, 3, 1, 26),
	(44, 'Test', 'Test', 'rwar§', 0, 0, 0, 3, 2, 26),
	(45, 'Quentin Krenger', 'Av. de Vernand-Dessous 4', 'Cheseaux-sur-Lausanne', 1033, 1, 0, 1, 2, 26),
	(46, 'Adieu', 'Av 4', 'Lausann', 1234, 1, 0, 1, 1, 26),
	(47, 'Angelo Rogeiro', 'Rue de Genève 63', 'Lausanne', 1002, 1, 1, 3, 1, 35),
	(48, 'Angelo Rogeiro', 'Rue de Genève 63', 'Lausanne', 1002, 1, 1, 3, 2, 35),
	(49, 'Quentin Krenger', 'Av. De Vernand-Dessous 4', 'Cheseaux', 1033, 1, 1, 1, 1, 36),
	(50, 'Quentin Krenger', 'Av. De Vernand-Dessous 4', 'Cheseaux', 1033, 1, 1, 1, 2, 36),
	(51, 'test test', 'test', 'test', 1000, 1, 1, 2, 1, 37),
	(52, 'test test', 'test', 'test', 1000, 1, 1, 2, 2, 37),
	(53, 'ToiMeme TuCest', 'Chemin du Village 26n', 'Lausanne', 1032, 1, 1, 2, 1, 38),
	(54, 'ToiMeme TuCest', 'Chemin du Village 26n', 'Lausanne', 1032, 1, 1, 2, 2, 38),
	(55, 'tzest', 'test', 'test', 1234, 1, 0, 2, 1, 25),
	(56, 'tzest', 'test', 'test', 1234, 1, 0, 2, 2, 25),
	(57, 'test', 'test', 'we', 1234, 1, 0, 2, 1, 25),
	(58, 'test', 'test', 'we', 1234, 1, 0, 2, 2, 25);
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_categories : ~57 rows (environ)
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
	(16, 'Bricolage & Hobby', 1, NULL),
	(17, 'Supermarché & Droguerie', 1, NULL),
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
	(47, 'périphériques d\'entrée gamers', 1, 10),
	(48, 'Les bons plans', 1, 18),
	(49, 'Jardin', 1, 16),
	(50, 'Barbecue', 1, 16),
	(51, 'Eclairage', 1, 16),
	(52, 'Vins et bières', 1, 17),
	(53, 'Santé', 1, 17),
	(54, 'Snacks', 1, 17),
	(55, 'Vins blancs', 1, 52),
	(56, 'Bières blondes', 1, 52),
	(57, 'Bières blanches', 1, 52),
	(58, 'Bières sans alcool', 1, 52),
	(59, 'Bonbon', 1, 54),
	(60, 'Chocolat', 1, 54),
	(61, 'Chips', 1, 54);
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_comments : ~8 rows (environ)
/*!40000 ALTER TABLE `t_comments` DISABLE KEYS */;
INSERT INTO `t_comments` (`id_Comment`, `CommentValue`, `CommentDate`, `isActive`, `FK_Product`, `FK_Customer`) VALUES
	(30, 'whit', '2020-06-04 11:02:53', 1, 76, 26),
	(31, 'test', '2020-06-05 07:52:32', 1, 81, 25),
	(32, 'ok c\'est co^l', '2020-06-05 07:53:03', 1, 81, 25),
	(34, 'Woaw ce site est vraiment super bien ! Bravo Winston et Quentin pour ce superbe boulot !', '2020-06-07 12:51:53', 1, 58, 25),
	(35, 'test', '2020-06-11 11:10:04', 1, 83, 25),
	(36, 'Adieu c\'t\'équipe ! ça joue ou bien ?', '2020-06-15 09:15:35', 1, 81, 25),
	(37, 'Pellentesque faucibus diam quis porta sollicitudin. Praesent egestas nibh eget volutpat laoreet. In a ultrices elit. Suspendisse sagittis mollis molestie. Sed et finibus risus. Pellentesque eu sem quis dolor convallis pharetra. Proin nec libero at quam tincidunt viverra. Vestibulum varius eu eros id maximus. Phasellus lobortis nunc at enim feugiat varius. Donec et mattis arcu. Nam eget felis ut libero consequat suscipit eget ac libero. Ut mollis lectus eget elit tempus, sed viverra lorem pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus interdum hendrerit urna, vel faucibus dolor hendrerit non. Nullam et nunc et dui sollicitudin commodo ut sed leo. Nunc faucibus faucibus sollicitudin. ', '2020-06-15 09:17:09', 1, 81, 25),
	(38, 'test', '2020-06-23 10:22:19', 1, 69, 38);
/*!40000 ALTER TABLE `t_comments` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_customers
CREATE TABLE IF NOT EXISTS `t_customers` (
  `id_customer` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerLastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerBirthday` date NOT NULL,
  `CustomerSince` date DEFAULT curdate(),
  `FK_Title` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_customer`),
  KEY `FK_CustomerTitle` (`FK_Title`),
  CONSTRAINT `FK_CustomerTitle` FOREIGN KEY (`FK_Title`) REFERENCES `t_titles` (`id_CustomerTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_customers : ~8 rows (environ)
/*!40000 ALTER TABLE `t_customers` DISABLE KEYS */;
INSERT INTO `t_customers` (`id_customer`, `CustomerName`, `CustomerLastName`, `CustomerPhone`, `CustomerEmail`, `CustomerBirthday`, `CustomerSince`, `FK_Title`) VALUES
	(24, 'Chippo', 'Lata', '+4171237654', 'lapute@gmail.com', '1890-01-01', '2020-03-18', 2),
	(25, 'Un mec', 'randomeee', '9999', 'test@email.com', '2020-05-09', '2020-03-18', 1),
	(26, 'cookie', 'testnom', '9999', 'test@email.com', '2020-05-15', '2020-03-18', 1),
	(32, 'Salami', 'Italien', '+31 222 222 222 2', 'salami@sala.com', '1000-01-01', '2020-05-13', 1),
	(33, 'Choisir', 'adresse', '+41768018510', 'test@swisstchstore.com', '2020-05-21', '2020-05-13', 2),
	(34, 'dsa', 'asda', '+41768018510', 'winstonforti@gmail.com', '2020-05-01', '2020-05-13', 3),
	(35, 'Angelo', 'Rogeiro', '021 316 58 58', 'angelo.rogeiro@eduvaud.ch', '1974-01-02', '2020-06-04', 3),
	(36, 'Quentin', 'Krenger', '079 603 68 34', 'quentinkrenger@gmail.com', '2001-02-17', '2020-06-04', 1),
	(37, 'test', 'test', '079 604 55 55', 'test@gmail.com', '2001-01-01', '2020-06-04', 2),
	(38, 'ToiMeme', 'TuCest', '+41 79 603 68 34', 'petit@test.com', '2020-06-10', '2020-06-23', 2);
/*!40000 ALTER TABLE `t_customers` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_images
CREATE TABLE IF NOT EXISTS `t_images` (
  `id_Image` int(11) NOT NULL AUTO_INCREMENT,
  `ImageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Image`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_images : ~29 rows (environ)
/*!40000 ALTER TABLE `t_images` DISABLE KEYS */;
INSERT INTO `t_images` (`id_Image`, `ImageName`, `ImagePath`) VALUES
	(27, '58214203_xxl', '58214203_xxl.jpg'),
	(29, 'sony-playstation-4-slim-1tb-black', 'Sony-Playstation-4-Slim-1TB-Black.jpg'),
	(30, 'nintendo-switch-', 'Nintendo-Switch-.jpg'),
	(32, 'img-article-temp', 'img-article-temp.jpg'),
	(33, 'ipad-7th-silver', 'iPad-7th-Silver.jpg'),
	(34, 'logitech-maus-b100', 'Logitech-Maus-B100.jpg'),
	(35, '57870887_xxl', '57870887_xxl.jpg'),
	(36, '51432703_xxl', '51432703_xxl.jpg'),
	(37, '58132276_xxl', '58132276_xxl.jpg'),
	(38, '57914514_xxl', '57914514_xxl.jpg'),
	(39, '58905748_xxl', '58905748_xxl.jpg'),
	(40, '114329576_xxl', '114329576_xxl.jpg'),
	(41, '58041655_xxl', '58041655_xxl.jpg'),
	(42, '57939686_xxl', '57939686_xxl.jpg'),
	(43, '96063065_xxl', '96063065_xxl.jpg'),
	(44, '57864799_xxl', '57864799_xxl.jpg'),
	(45, '51466813_xxl', '51466813_xxl.jpg'),
	(46, '58836973_xxl', '58836973_xxl.jpg'),
	(47, '58465330_xxl', '58465330_xxl.jpg'),
	(48, '51466642_xxl', '51466642_xxl.jpg'),
	(49, '58275831_xxl', '58275831_xxl.jpg'),
	(50, '58616384_xxl', '58616384_xxl.jpg'),
	(51, '58420794_xxl', '58420794_xxl.jpg'),
	(52, '58271487_xxl', '58271487_xxl.jpg'),
	(53, '51433420_xxl', '51433420_xxl.jpg'),
	(54, '51361841_xxl', '51361841_xxl.jpg'),
	(56, 'bbq_kebab', 'bbq_kebab.jpg'),
	(60, '1200px-six.svg', '1200px-Six.svg.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table db_swisstech.t_lock_product : ~0 rows (environ)
/*!40000 ALTER TABLE `t_lock_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_lock_product` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_manufacturers
CREATE TABLE IF NOT EXISTS `t_manufacturers` (
  `id_Manufacturer` int(11) NOT NULL AUTO_INCREMENT,
  `ManufacturerName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_Manufacturer`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_manufacturers : ~32 rows (environ)
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
	(20, 'Nintendo'),
	(21, 'Sterillium'),
	(22, 'Diverse'),
	(23, 'Doritos'),
	(24, 'Ferrero'),
	(25, 'M&Ms'),
	(26, 'Haribo'),
	(27, 'Corona'),
	(28, 'Appenzeller Bier'),
	(29, 'Feldschlösschen'),
	(30, 'Vittel'),
	(31, 'Juliane Eller Weine'),
	(32, 'Samen Mauser'),
	(33, 'Windhager'),
	(34, 'Stöckli'),
	(35, 'Philips'),
	(36, 'Clatronic');
/*!40000 ALTER TABLE `t_manufacturers` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_orders
CREATE TABLE IF NOT EXISTS `t_orders` (
  `id_Order` int(11) NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `FK_Status` int(11) NOT NULL DEFAULT 1,
  `FK_PaymentMethod` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL,
  `FK_Order_ShippingAddress` int(11) DEFAULT NULL,
  `FK_Order_BillingAddress` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Order`),
  KEY `FK_Order_Status` (`FK_Status`),
  KEY `FK_Order_Customer` (`FK_Customer`),
  KEY `FK_Order_PaymentMethod` (`FK_PaymentMethod`),
  KEY `FK_Order_ShippingAddress` (`FK_Order_ShippingAddress`),
  KEY `FK_Order_BillingAddress` (`FK_Order_BillingAddress`),
  CONSTRAINT `FK_Order_BillingAddress` FOREIGN KEY (`FK_Order_BillingAddress`) REFERENCES `t_address` (`id_Address`),
  CONSTRAINT `FK_Order_Customer` FOREIGN KEY (`FK_Customer`) REFERENCES `t_customers` (`id_customer`),
  CONSTRAINT `FK_Order_PaymentMethod` FOREIGN KEY (`FK_PaymentMethod`) REFERENCES `t_paymentmethod` (`id_paymentmethod`),
  CONSTRAINT `FK_Order_ShippingAddress` FOREIGN KEY (`FK_Order_ShippingAddress`) REFERENCES `t_address` (`id_Address`),
  CONSTRAINT `FK_Order_Status` FOREIGN KEY (`FK_Status`) REFERENCES `t_status` (`id_Status`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_orders : ~15 rows (environ)
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` (`id_Order`, `OrderDate`, `FK_Status`, `FK_PaymentMethod`, `FK_Customer`, `FK_Order_ShippingAddress`, `FK_Order_BillingAddress`) VALUES
	(56, '2020-05-30 15:54:59', 1, 2, 26, 42, 45),
	(57, '2020-05-30 15:55:30', 1, 2, 26, 42, 45),
	(58, '2020-05-30 16:01:37', 1, 2, 26, 46, 26),
	(59, '2020-06-05 09:51:33', 1, 2, 25, 40, 32),
	(60, '2020-06-08 13:47:08', 3, 2, 25, 15, 16),
	(61, '2020-06-09 09:31:59', 2, 2, 25, 15, 16),
	(62, '2020-06-15 07:19:59', 1, 2, 25, 15, 16),
	(63, '2020-06-15 10:13:59', 1, 2, 25, 15, 32),
	(64, '2020-06-15 10:29:42', 1, 2, 25, 15, 16),
	(65, '2020-06-15 13:02:38', 3, 2, 25, 15, 16),
	(66, '2020-06-18 08:24:22', 3, 2, 25, 15, 16),
	(67, '2020-06-21 22:22:53', 1, 2, 25, 15, 16),
	(68, '2020-06-22 14:04:57', 1, 2, 25, 15, 16),
	(69, '2020-06-22 14:12:46', 1, 2, 25, 15, 16),
	(70, '2020-06-22 14:13:14', 1, 2, 25, 15, 16),
	(71, '2020-06-23 10:24:02', 3, 2, 25, 15, 32);
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;

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

-- Listage des données de la table db_swisstech.t_paymentcustomer : ~0 rows (environ)
/*!40000 ALTER TABLE `t_paymentcustomer` DISABLE KEYS */;
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
  `ProductSize` decimal(6,2) NOT NULL DEFAULT 0.00,
  `ProductDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products : ~28 rows (environ)
/*!40000 ALTER TABLE `t_products` DISABLE KEYS */;
INSERT INTO `t_products` (`id_Product`, `ProductName`, `ProductSize`, `ProductDescription`, `ProductUnitPrice`, `isActive`, `FK_Category`, `FK_Manufacturer`, `FK_ProductColor`) VALUES
	(58, 'iPhone 11 128GB Noir', 6.20, 'test test gang ou pas\n', 799.00, 1, 9, 3, 8),
	(60, 'Console de jeu PlayStation 4 Pro 1 TB Noir ', 24.00, 'Console de jeu haut de gamme, noire, PS4\n\nAvec la Sony PlayStation 4 Pro 1 To, vous pouvez jouer aux jeux vidéo actuels de la prochaine génération en douceur et dans des graphismes modernes. La console de jeu compacte sert également de lecteur DVD ou Blu-ray, peut lire des fichiers vidéo et de la musique comme un media center à domicile, ou peut être utilisée pour surfer sur Internet. La console est livrée avec un disque dur interne d\'une capacité de 1 To. Vous pouvez donc acheter et télécharger des jeux directement en ligne. Les partitions de jeu, les vidéos et les fichiers musicaux peuvent également être stockés.', 389.00, 1, 44, 17, 8),
	(61, 'Console de jeu Switch Rouge/Bleu', 22.90, 'La console de jeu pour à la maison, sur la route ou dans le train !\n\nAvec la console Nintendo, vous avez la garantie de la flexibilité et de la liberté. N\'interrompez pas un match quand vous n\'avez pas le temps, prenez-le avec vous. La manette Nintendo s\'adapte à votre rythme et vous permet de jouer quand, où et avec qui vous voulez. Vous pouvez donc utiliser la console Nintendo en mode TV à la maison, en mode table chez un ami ou en mode portable en déplacement.', 349.00, 1, 44, 20, 10),
	(62, 'Ecouteurs intra-auriculaires Wireless AirPods Pro Blanc', 243.00, 'Casque d\'écoute Bluetooth avec annulation active du bruit pour les appareils Apple\n\nQue vous soyez un utilisateur fréquent ou un passionné de musique, AirPods Pro est le complément parfait à presque tous les appareils Apple. Ils ne servent pas seulement d\'écouteurs : activez Siri d\'un double tap ou dites simplement "Hey Siri" pour régler le volume par commande vocale, changer la chanson, appeler quelqu\'un ou laissez-les vous indiquer le chemin. Maintenez la touche enfoncée pour basculer entre le mode de transparence et la réduction active du bruit. Les AirPods offrent une reproduction audio et vocale riche et de haute qualité. Lorsque vous êtes au téléphone, les microphones à faisceaux d\'ondes filtrent les bruits de fond et accentuent votre voix.', 259.00, 1, 13, 3, 7),
	(64, 'iPad 7th Gen. Wifi 32 Go d\'argent', 11.30, 'Comprimé puissant avec écran rétine de 10,2 po\n\nLe nouvel iPad est doté d\'un écran rétine de 10,2 pouces plus grand que son prédécesseur pour mettre en valeur des contenus tels que des films, des jeux et des dessins encore meilleurs. L\'iPad prend en charge le crayon Apple et maintenant aussi les claviers intelligents Apple pour rendre le travail, l\'apprentissage ou le dessin simple et polyvalent. Le nouvel iPadOS offre des fonctionnalités conçues spécialement pour l\'iPad, pour un multitâche productif et une expérience divertissante sur votre iPad. Sa conception robuste et légère en fait le compagnon idéal au quotidien.\nMince et rapide\n\nL\'iPad est si puissant que chaque application fonctionne rapidement et en douceur - qu\'il s\'agisse d\'une aide pratique au quotidien, d\'une application d\'apprentissage fascinante ou d\'un jeu à forte intensité graphique - avec les performances de la puce 64 bits A10, ce n\'est pas un problème, même si vous faites plusieurs choses en même temps. Le coprocesseur M10 Motion capture le mouvement avec précision et fiabilité. Malgré ces performances, il n\'est que de 7,5 mm d\'épaisseur, ce qui, combiné à la durée de vie de la batterie (jusqu\'à dix heures), garantit une mobilité maximale.', 379.00, 1, 24, 3, 7),
	(65, 'Souris B100 Optical', 10.00, 'Souris Business en version OEM, noir\n\nLa Logitech Optical Mouse B100 est une souris d\'entreprise conçue pour une utilisation au bureau ou au bureau à domicile. Il convient aussi bien aux droitiers qu\'aux gauchers. La molette de défilement vous permet de faire défiler les documents et les pages Web plus rapidement. Grâce à son port USB, il peut être utilisé avec tous les systèmes d\'exploitation courants et ne nécessite aucun pilote supplémentaire.', 11.95, 1, 5, 15, 8),
	(66, 'Galaxy S10 128GB Prism Black ', 6.10, 'Téléphone intelligent phare avec triple caméra\n\nSamsung établit de nouveaux standards avec le Galaxy S10. L\'écran Super-Amoled de 6,1 pouces n\'a presque pas de bords, même la caméra avant n\'utilise qu\'un minimum d\'espace d\'affichage. De plus, un capteur d\'empreintes digitales est intégré dans l\'écran qui, grâce à la technologie ultrasonore, ne vous laissera pas tomber même par temps froid ou humide. La performance sait convaincre avec un processeur Octa-Core puissant et 8 Go de RAM. Le boîtier mince protège également son intérieur de l\'eau et de la poussière conformément à la norme IP68.', 649.00, 1, 9, 4, 8),
	(67, 'SSD 860 EVO 2.5" SATA 500 GB', 2.50, '2.5"-Solid State Drive mit 500 GB\n\nLe Samsung 860 EVO est conçu pour les particuliers exigeants et soucieux du prix qui souhaitent améliorer les performances de leur PC ou ordinateur portable. Il utilise TLC-V-NAND avec 64 couches de mémoire. La technologie "Intelligent TurboWrite" avec tampon SLC variable offre de meilleures performances sur de plus longues périodes de temps que les technologies TurboWrite actuelles.', 89.90, 1, 7, 4, 8),
	(68, 'Encre Nr. 62XL (C2P05AE) noir ', 10.00, 'L\'encre HP d\'origine vous offre, en liaison avec votre appareil HP, des résultats d\'impression optimaux. Que ce soit au bureau ou dans l\'entreprise - avec l\'encre HP d\'origine, les résultats de haute qualité ne sont plus qu\'à une impression.', 39.95, 1, 32, 2, 8),
	(69, 'TV UE55RU7170 55"', 55.00, 'Télévision intelligente avec résolution UHD 4K\n\nAvec "SmartThings", le RU7170 de Samsung offre de nombreuses nouvelles possibilités et un support pour le système d\'assistance vocale "Alexa" et "Google Assistant" ainsi que pour l\'assistant vocal de Samsung "Bixby". Vous pouvez également connecter votre téléviseur UHD Samsung à des haut-parleurs intelligents compatibles d\'autres fabricants. Le processeur UHD exploite pleinement les possibilités du HDR et fournit une image à fort contraste et aux couleurs intenses.', 579.00, 1, 12, 4, 8),
	(70, 'Gel désinfectant Mains 475 ml', 10.00, 'Gel désinfectant pour les mains\n\nLe gel désinfectant pour les mains Sterillium a un large spectre d\'action contre les bactéries, les champignons et les virus. Il est très bien toléré par la peau et augmente son hydratation.', 21.90, 1, 53, 21, 7),
	(71, 'Schutzmaske FFP2, 25 pièces', 15.00, 'Masque de protection respiratoire KN95 FFP2, 25 pièces - Emballage individuel\n\nObjectif : protection des voies respiratoires contre les particules solides et liquides moins toxiques et moins nocives. Industrie du bâtiment, agriculture, carrières, industrie de l\'argile et de la céramique, fonderie de fer et d\'acier, construction navale, industrie chimique, traitement des métaux, industrie pharmaceutique, laboratoire, désamiantage, etc. N\'utiliser que dans des pièces suffisamment ventilées (au moins 17% de teneur en oxygène) ou à l\'extérieur.', 99.00, 1, 53, 22, 7),
	(72, 'Chips Nacho Cheese 125g', 10.00, 'Croustilles tortilla de maïs', 2.95, 1, 61, 23, 5),
	(73, 'Barres chocolatées et snacks Chocolat Enfant 8 barres 100g', 10.00, 'Chocolat au lait fourré avec fourrage au lait (60%)\n\nUn goût unique et une excellente qualité....les enfants sont aimés depuis des générations.', 1.80, 1, 60, 24, 3),
	(74, 'Chocolat Peanut 500 g', 2.00, 'Le classique populaire', 5.80, 1, 60, 25, 4),
	(75, 'Gélifiés Anaconda Serpents géants en boîte de 30 pièces', 31.00, 'Gelée de fruits au sucre mousse', 14.95, 1, 59, 26, 3),
	(76, 'Bière Extra Bière 6 x 0,355 l', 15.00, 'Meilleure façon de se rafraichir en temps de confinement.', 15.20, 1, 56, 27, 4),
	(77, 'Quöllfrisch Fût 5 l de lumière', 50.00, 'Appenzeller Bière à la lumière fraîchement pressée\n\nLe quöll frais et brillant se caractérise par sa douceur et son fruité léger. Elle est brassée à partir de pur malt Pilsner et de trois variétés différentes de houblon de Stammheim et du Hallertau. La durée de conservation allant jusqu\'à trois mois donne à la bière son équilibre.', 20.45, 1, 56, 28, 1),
	(78, 'Bière Weizen 4 x 0,5 l', 12.00, 'La couleur brille en jaune vif et est entremêlée d\'un fin voile de levure. Des notes fruitées d\'agrumes et de banane, associées au parfum épicé oriental de la coriandre, suscitent l\'attente de la première gorgée. En bouche, il y a un équilibre agréable entre les notes fruitées de l\'écorce d\'orange et les arômes épicés de la coriandre. La bouche est veloutée et veloutée, avec une légère amertume, une acidité légère et rafraîchissante en finale, qui complète joyeusement l\'expérience gustative.', 8.90, 1, 57, 29, 4),
	(79, 'Eau Naturelle 6 x 1,5 l', 25.00, 'Eau non gazeuse\n\nL\'eau minérale naturelle VITTEL passe par un chemin souterrain qui dure plus de 15 ans. Il est enrichi en sels minéraux essentiels avant d\'être mis en lumière au cœur des Vosges. Reconnu pour son naturel rafraîchissant et vivifiant, VITTEL est parfait pour l\'équilibre hydrique sain du corps tout au long de la journée. Il éveille la vitalité en vous et vous donne le sentiment exaltant de pouvoir "déplacer des montagnes" !', 6.60, 1, 58, 30, 3),
	(80, 'Vin blanc Juwel Cuvée blanc 0,75 l', 27.00, 'Cuvée de vin blanc de Rheinhessen\n\nCe bijou de la ligne JuWel reflète ce qui est pour nous un pur plaisir du vin : simplement délicieux, savoureux et une fois de plus délicieux ! Idéal pour tous les moments où l\'on veut simplement du vin. Lisse, sans maquillage, avec des fruits acidulés et une pâte fondante.', 15.80, 1, 55, 31, 7),
	(81, 'Semence Fedora chanvre', 5.00, 'Plantes annuelles\n\nUne plante anuelle est une plante herbacée qui requiert une seule période de végétation jusqu\' à la floraison et la la maturité des fruits de la nouvelle graine, puis elle meurt à la même période.', 3.45, 1, 49, 32, 2),
	(82, 'Serre à tomates ou autre', 50.00, 'Croissance optimale grâce à l\'effet de serre\n\nLes tomates sont très populaires partout. Les tomates sont fraîches et croquantes et tout simplement extrêmement savoureuses. Avec la maison de tomates Alustar Windhager, vous pouvez construire votre propre lit de légumes pour vos tomates.', 89.90, 1, 49, 33, 7),
	(83, 'Arrosoir Jardin 10l', 10.00, 'Arrosez vos plantes avec l\'arrosoir Stöckli. Il est fabriqué en plastique stabilisé aux UV et a donc une longue durée de vie.', 17.95, 1, 49, 34, 2),
	(84, 'hue LED Stripes Lightstrip+ 1m allongement', 100.00, 'Barres lumineuses sans fil, contrôlables par smartphone\n\nLes bandes lumineuses de couleur de Philips sont auto-adhésives, peuvent être découpées sur mesure et peuvent être étendues jusqu\'à 10 m en les clipsant ensemble. Les LEDs ont une luminosité de 600 à 1600 lumens et une durée de vie allant jusqu\'à 20.000 heures. Avec le robinet de teinte et le kit de gradation, les rampes lumineuses peuvent être contrôlées et connectées avec de la musique et Ambilight, mais le kit de démarrage est nécessaire.', 24.90, 1, 51, 35, 7),
	(85, 'Ampoule Hue White & Color Ambiance, 2 pièces', 14.00, 'Lampe sans fil contrôlable par smartphone (2 pièces)\n\nAvec l\'ampoule Philips Hue E14 RGBW, vous obtenez une ampoule LED avec filetage E14 et une consommation d\'énergie de 6 watts pour une lumière de haute qualité afin d\'étendre votre jeu de couleurs existant. La lampe a une intensité lumineuse allant jusqu\'à 470 lumens et convainc par sa longévité. La source lumineuse peut facilement être connectée au pont acheté séparément à partir du kit de démarrage Hue. Le contrôle se fait via l\'application, mais est également possible via Hue Tap et l\'interrupteur du kit de gradation et est également compatible avec Apple HomeKit. Remplissez votre maison d\'une lumière qui vous procure un sentiment de bien-être et que vous pouvez adapter à votre humeur et à vos besoins.', 83.85, 1, 51, 35, 2),
	(87, 'Barbecue électrique Döner-Vertikal-Multigrill DVG 3686', 25.50, 'Gril électrique vertical pour brochettes de kebab/gyros, de poulet ou de viande\n\nAvec le gril vertical DVG 3686 kebab de Clatronic, vous pouvez faire apparaître un kebab comme un snack autour du plafond. Vous avez plusieurs possibilités pour préparer le kebab afin de créer une collation unique avec votre propre recette spéciale.', 72.00, 1, 50, 36, 8),
	(90, 'Exemple de note à donner', 6.00, 'Vu le prix ... Comment peut-on s\'en passer ;)', 0.06, 1, 48, 13, 7);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_images : ~25 rows (environ)
/*!40000 ALTER TABLE `t_products_images` DISABLE KEYS */;
INSERT INTO `t_products_images` (`id_Product_Image`, `FK_Product`, `FK_Image`) VALUES
	(31, 58, 27),
	(33, 60, 29),
	(34, 61, 30),
	(35, 62, 32),
	(36, 64, 33),
	(37, 65, 34),
	(38, 66, 35),
	(39, 67, 36),
	(40, 68, 37),
	(41, 69, 38),
	(42, 70, 39),
	(43, 71, 40),
	(44, 72, 41),
	(45, 73, 42),
	(46, 74, 43),
	(47, 75, 44),
	(48, 76, 45),
	(49, 77, 46),
	(50, 78, 47),
	(51, 79, 48),
	(52, 80, 49),
	(53, 81, 50),
	(54, 82, 51),
	(55, 83, 52),
	(56, 84, 53),
	(57, 85, 54),
	(58, 87, 56),
	(60, 90, 60);
/*!40000 ALTER TABLE `t_products_images` ENABLE KEYS */;

-- Listage de la structure de la table db_swisstech. t_products_orders
CREATE TABLE IF NOT EXISTS `t_products_orders` (
  `id_Product_Order` int(11) NOT NULL AUTO_INCREMENT,
  `Quantity` int(4) NOT NULL,
  `CourantUnitPrice` decimal(6,2) DEFAULT NULL,
  `FK_Product` int(11) NOT NULL,
  `FK_Order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Product_Order`),
  KEY `FK_ProductOrder_Order` (`FK_Order`),
  KEY `FK_ProductOrder_Product` (`FK_Product`),
  CONSTRAINT `FK_ProductOrder_Order` FOREIGN KEY (`FK_Order`) REFERENCES `t_orders` (`id_Order`),
  CONSTRAINT `FK_ProductOrder_Product` FOREIGN KEY (`FK_Product`) REFERENCES `t_products` (`id_Product`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_products_orders : ~26 rows (environ)
/*!40000 ALTER TABLE `t_products_orders` DISABLE KEYS */;
INSERT INTO `t_products_orders` (`id_Product_Order`, `Quantity`, `CourantUnitPrice`, `FK_Product`, `FK_Order`) VALUES
	(78, 1, 389.00, 60, 56),
	(79, 1, 799.00, 58, 56),
	(80, 1, 15.20, 76, 56),
	(81, 1, 20.45, 77, 56),
	(82, 1, 14.95, 75, 57),
	(83, 1, 83.85, 85, 57),
	(84, 1, 5.80, 74, 57),
	(85, 1, 799.00, 58, 58),
	(86, 1, 389.00, 60, 58),
	(87, 1, 379.00, 64, 59),
	(88, 1, 579.00, 69, 59),
	(89, 1, 6.60, 79, 59),
	(90, 2, 389.00, 60, 59),
	(91, 1, 799.00, 58, 59),
	(92, 2, 72.00, 87, 60),
	(93, 1, 72.00, 87, 61),
	(94, 1, 15.20, 76, 61),
	(95, 2, 799.00, 58, 61),
	(96, 1, 349.00, 61, 62),
	(97, 1, 5.80, 74, 62),
	(98, 1, 799.00, 58, 63),
	(99, 1, 259.00, 62, 63),
	(100, 20, 15.20, 76, 63),
	(101, 31, 379.00, 64, 64),
	(102, 1, 20.45, 77, 65),
	(103, 3, 799.00, 58, 65),
	(104, 1, 259.00, 62, 65),
	(105, 1, 379.00, 64, 66),
	(106, 1, 99.00, 71, 66),
	(107, 5, 21.90, 70, 66),
	(108, 1, 389.00, 60, 67),
	(109, 2, 349.00, 61, 67),
	(110, 1, 3.45, 81, 68),
	(111, 4, 20.45, 77, 69),
	(112, 1, 8.90, 78, 70),
	(113, 2, 379.00, 64, 71),
	(114, 1, 8.90, 78, 71),
	(115, 1, 15.80, 80, 71),
	(116, 1, 99.00, 71, 71);
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

-- Listage des données de la table db_swisstech.t_rss : ~5 rows (environ)
/*!40000 ALTER TABLE `t_rss` DISABLE KEYS */;
INSERT INTO `t_rss` (`Title`, `Link`, `Guid`, `Description`, `PubDate`) VALUES
	('iPhone 11 128GB Noir', 58, 1591357138, 'test test gang ou pas\n', '2020-06-05 13:38:58'),
	('Console de jeu PlayStation 4 Pro 1 TB Noir ', 60, 1591357418, 'Console de jeu haut de gamme, noire, PS4\n\nAvec la Sony PlayStation 4 Pro 1 To, vous pouvez jouer aux jeux vidéo actuels de la prochaine génération en douceur et dans des graphismes modernes. La console de jeu compacte sert également de lecteur DVD ou Blu-', '2020-06-05 13:43:38'),
	('Console de jeu Switch Rouge/Bleu', 61, 1591357504, 'La console de jeu pour à la maison, sur la route ou dans le train !\n\nAvec la console Nintendo, vous avez la garantie de la flexibilité et de la liberté. N\'interrompez pas un match quand vous n\'avez pas le temps, prenez-le avec vous. La manette Nintendo s\'', '2020-06-05 13:45:04'),
	('Exemple de note à donner', 88, 1593592396, 'Vu le prix ... comment s\'en passer ;)', '2020-07-01 10:33:16'),
	('test', 89, 1593592446, 'test', '2020-07-01 10:34:06'),
	('Exemple de note à donner', 90, 1593592582, 'Vu le prix ... Comment peut-on s\'en passer ;)', '2020-07-01 10:36:22');
/*!40000 ALTER TABLE `t_rss` ENABLE KEYS */;

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

-- Listage des données de la table db_swisstech.t_titles : ~3 rows (environ)
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table db_swisstech.t_users : ~10 rows (environ)
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
INSERT INTO `t_users` (`id_user`, `Username`, `Password`, `Salt`, `Token`, `TokenValidity`, `isActive`, `IpAddress`, `FK_Role`, `FK_Customer`) VALUES
	(29, 'chippo', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '4c2ca7e31c52b564f8c5ca5a3fef68bb', '2020-05-08 10:40:56', 1, '127.0.0.1', 2, 24),
	(30, 'test', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '4ae17941d2504550575562b8722a11ca', '2020-07-01 11:48:21', 1, '127.0.0.1', 2, 25),
	(31, 'cookie', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '03cc22d622e084f6ccb287fb1bc0cabf', '2020-06-08 12:37:15', 1, '127.0.0.1', 1, 26),
	(36, 'salami', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', 'f27447f6c4f339639e7f045bb842cd10', '2020-05-13 15:51:24', 1, '', 1, 32),
	(37, 'rapelli', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', '80f625b9e871c1d38e6397c6c3acca82', '2020-05-13 16:04:07', 1, '', 1, 33),
	(38, 'winston', '2f9833894a0e04b64880f4be693bb44ac86d6e76957f52b86da4c748166608d2', 'monsalt', 'edac5fb5d4552857aa458af75c0c6b8b', '2020-05-13 16:06:14', 1, '', 1, 34),
	(39, 'rogeiroa', 'aa5c4d4b2d819b50567748d4de48cdd7c518022882616aa8bc28881d9c1f4579', 'i;151-120#', '2af1d06b832a7ad8805a3dfada2fdecf', '2020-06-04 11:17:03', 1, '127.0.0.1', 2, 35),
	(40, 'quentinkrg', '5fd9d015545598ed79724d757394907d585b60c72d3642d92f9ee2943c63e03c', 'i;151-120#', '3a25efdfd80dc599c2acbbeeb53ee1ef', '2020-06-04 11:24:26', 1, '::1', 1, 36),
	(41, 'okgoogle', 'a461cc3a26370057004ea51dde38d23751b16073f22dc9754c4898100a3b60aa', 'i;151-120#', '8edd90601e787bee708e86e6b4234f7b', '2020-06-04 11:31:49', 1, '', 1, 37),
	(42, 'Adieu', '3fb35359a5deeb35ac6ad78c448dfacaa5b3e8a7b53e26f3c8eddd67d27e7ff3', 'i;151-120#', '0a2a2e86be0b53e68f1b330f5b107951', '2020-06-23 08:34:46', 1, '', 1, 38);
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
