-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 26 jan. 2020 à 00:20
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP :  7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `db_swisstech`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_address`
--

CREATE TABLE `t_address` (
  `id_Address` int(11) NOT NULL,
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ZIP` int(10) NOT NULL,
  `FK_AddressType` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_addresstypes`
--

CREATE TABLE `t_addresstypes` (
  `id_AddressType` int(11) NOT NULL,
  `AddressType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_categories`
--

CREATE TABLE `t_categories` (
  `id_Category` int(11) NOT NULL,
  `CategoryName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `FK_Category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Structure de la table `t_comments`
--

CREATE TABLE `t_comments` (
  `id_Comment` int(11) NOT NULL,
  `CommentValue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `CommentDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `FK_Product` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_customers`
--

CREATE TABLE `t_customers` (
  `id_customer` int(11) NOT NULL,
  `CustomerName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerLastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CustomerEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerBirthday` date NOT NULL,
  `FK_ShoppingCart` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_images`
--

CREATE TABLE `t_images` (
  `id_Image` int(11) NOT NULL,
  `ImageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_manufacturers`
--

CREATE TABLE `t_manufacturers` (
  `id_Manufacturer` int(11) NOT NULL,
  `ManufacturerName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Structure de la table `t_orders`
--

CREATE TABLE `t_orders` (
  `id_Order` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL,
  `FK_Status` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_parameters`
--

CREATE TABLE `t_parameters` (
  `id_Parameter` int(11) NOT NULL,
  `ParameterType` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParameterKey` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParameterValue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_paymentcustomer`
--

CREATE TABLE `t_paymentcustomer` (
  `id_Payment` int(11) NOT NULL,
  `CardNumber` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CardCode` int(3) NOT NULL,
  `ExpiringDate` date NOT NULL,
  `FK_Customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_products`
--

CREATE TABLE `t_products` (
  `id_Product` int(11) NOT NULL,
  `ProductName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductColor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductSize` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProductUnitPrice` float NOT NULL,
  `FK_Category` int(11) NOT NULL,
  `FK_Manufacturer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------

--
-- Structure de la table `t_products_images`
--

CREATE TABLE `t_products_images` (
  `id_Product_Image` int(11) NOT NULL,
  `FK_Product` int(11) NOT NULL,
  `FK_Image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_products_orders`
--

CREATE TABLE `t_products_orders` (
  `id_Product_Order` int(11) NOT NULL,
  `Quantity` int(4) NOT NULL,
  `UnitPrice` float NOT NULL,
  `FK_Product` int(11) NOT NULL,
  `FK_Order` int(11) DEFAULT NULL,
  `FK_ShoppingCart` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_roles`
--

CREATE TABLE `t_roles` (
  `id_role` int(11) NOT NULL,
  `RoleName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_shoppingcart`
--

CREATE TABLE `t_shoppingcart` (
  `id_ShoppingCart` int(11) NOT NULL,
  `ShoppingCartDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_status`
--

CREATE TABLE `t_status` (
  `id_Status` int(11) NOT NULL,
  `StatusName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `t_users`
--

CREATE TABLE `t_users` (
  `id_user` int(11) NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Salt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `FK_Role` int(11) NOT NULL,
  `FK_Customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_address`
--
ALTER TABLE `t_address`
  ADD PRIMARY KEY (`id_Address`);

--
-- Index pour la table `t_addresstypes`
--
ALTER TABLE `t_addresstypes`
  ADD PRIMARY KEY (`id_AddressType`);

--
-- Index pour la table `t_categories`
--
ALTER TABLE `t_categories`
  ADD PRIMARY KEY (`id_Category`);

--
-- Index pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD PRIMARY KEY (`id_Comment`);

--
-- Index pour la table `t_customers`
--
ALTER TABLE `t_customers`
  ADD PRIMARY KEY (`id_customer`);

--
-- Index pour la table `t_images`
--
ALTER TABLE `t_images`
  ADD PRIMARY KEY (`id_Image`);

--
-- Index pour la table `t_manufacturers`
--
ALTER TABLE `t_manufacturers`
  ADD PRIMARY KEY (`id_Manufacturer`);

--
-- Index pour la table `t_orders`
--
ALTER TABLE `t_orders`
  ADD PRIMARY KEY (`id_Order`);

--
-- Index pour la table `t_parameters`
--
ALTER TABLE `t_parameters`
  ADD PRIMARY KEY (`id_Parameter`);

--
-- Index pour la table `t_paymentcustomer`
--
ALTER TABLE `t_paymentcustomer`
  ADD PRIMARY KEY (`id_Payment`);

--
-- Index pour la table `t_products`
--
ALTER TABLE `t_products`
  ADD PRIMARY KEY (`id_Product`);

--
-- Index pour la table `t_products_images`
--
ALTER TABLE `t_products_images`
  ADD PRIMARY KEY (`id_Product_Image`);

--
-- Index pour la table `t_products_orders`
--
ALTER TABLE `t_products_orders`
  ADD PRIMARY KEY (`id_Product_Order`);

--
-- Index pour la table `t_roles`
--
ALTER TABLE `t_roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Index pour la table `t_shoppingcart`
--
ALTER TABLE `t_shoppingcart`
  ADD PRIMARY KEY (`id_ShoppingCart`);

--
-- Index pour la table `t_status`
--
ALTER TABLE `t_status`
  ADD PRIMARY KEY (`id_Status`);

--
-- Index pour la table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_address`
--
ALTER TABLE `t_address`
  MODIFY `id_Address` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_addresstypes`
--
ALTER TABLE `t_addresstypes`
  MODIFY `id_AddressType` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_categories`
--
ALTER TABLE `t_categories`
  MODIFY `id_Category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `t_comments`
--
ALTER TABLE `t_comments`
  MODIFY `id_Comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_customers`
--
ALTER TABLE `t_customers`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_images`
--
ALTER TABLE `t_images`
  MODIFY `id_Image` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_manufacturers`
--
ALTER TABLE `t_manufacturers`
  MODIFY `id_Manufacturer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `t_orders`
--
ALTER TABLE `t_orders`
  MODIFY `id_Order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_parameters`
--
ALTER TABLE `t_parameters`
  MODIFY `id_Parameter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_paymentcustomer`
--
ALTER TABLE `t_paymentcustomer`
  MODIFY `id_Payment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_products`
--
ALTER TABLE `t_products`
  MODIFY `id_Product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `t_products_images`
--
ALTER TABLE `t_products_images`
  MODIFY `id_Product_Image` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_products_orders`
--
ALTER TABLE `t_products_orders`
  MODIFY `id_Product_Order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_roles`
--
ALTER TABLE `t_roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_shoppingcart`
--
ALTER TABLE `t_shoppingcart`
  MODIFY `id_ShoppingCart` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_status`
--
ALTER TABLE `t_status`
  MODIFY `id_Status` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
