<?php
/*
  Classe pour la gestion des produits, elle hérite de la classe "Entity"
*/

// include de la classe rss
include("RSS.php");

// aller chercher le fichier php qui contient le code permettant de rafraichir le flux RSS
include_once("./UpdateRss.php");

class Product extends Entity
{
    // Construction
    public function  __construct()
    {

    }

    // Ajout d'un article : doit avoir un token
    public function AddProductMBAD()
    {
      // Vérifier que l'on reçoit bien les voulues
      if($this->jsonToProcess !=null)
      {
        // Récupération des valeurs pour l'article
        $productName = $this->jsonToProcess->ProductName;
        $productColorId = $this->jsonToProcess->ProductColorId;
        $productSize = $this->jsonToProcess->ProductSize;
        $productDescription = $this->jsonToProcess->ProductDescription;
        $productUnitPrice = $this->jsonToProcess->ProductUnitPrice;
        $FK_Category = $this->jsonToProcess->CategoryId;
        $FK_Manufacturer = $this->jsonToProcess->ManufacturerId;
        // Valeur pour l'image
        $imagePath = $this->jsonToProcess->ImagePath;

        // Ajout d'un article
        $addProduct = "INSERT INTO t_products (ProductName, FK_ProductColor, ProductSize, ProductDescription, ProductUnitPrice, FK_Category, FK_Manufacturer)
                        VALUES ('".addslashes($productName)."','$productColorId','$productSize','".addslashes($productDescription)."','$productUnitPrice','$FK_Category','$FK_Manufacturer')";
        // Exécution de la requête
        $this->Query($addProduct);

        // Récupération de l'id de l'article qui vient d'être ajouté
        $getLastProductAddedId = "SELECT t_products.id_Product FROM t_products ORDER BY  t_products.id_Product DESC LIMIT 1";
        $productId = ($this->Query($getLastProductAddedId)->fetchColumn());

        // Ajout de la relation article - images
        $addProductImage = "INSERT INTO t_products_images (FK_Product, FK_Image)
                            VALUES ('$productId', (SELECT t_images.id_Image FROM t_images WHERE t_images.ImagePath = '$imagePath' ORDER BY t_images.id_Image DESC LIMIT 1))";
        // Exécution de la requête
        $this->Query($addProductImage);

        //--- RSS ---//
        $rssTitle = $productName;
        $rssLink = $productId;
        $rssGuid = time();
        $rssDescription = addslashes($productDescription);

        // Ajout
        $rssEntity = new RSS();
        $rssEntity->AddRss($rssTitle,$rssLink,$rssGuid,$rssDescription);

        // Mise à jour du fichier
        update_fluxRSS($rssEntity);
      }
    }


    // Mise à jour d'un article
    public function UpdateProductMBAD()
    {
      // Vérifier que l'on reçoit bien les voulues
      if($this->jsonToProcess !=null)
      {
        // Récupération des valeurs pour l'article
        $productId = $this->jsonToProcess->id_Product;
        $productName = $this->jsonToProcess->ProductName;
        $productColorId = $this->jsonToProcess->ProductColor;
        $productSize = $this->jsonToProcess->ProductSize;
        $productDescription = $this->jsonToProcess->ProductDescription;
        $productUnitPrice = $this->jsonToProcess->ProductUnitPrice;
        $FK_Category = $this->jsonToProcess->CategoryId;
        $FK_Manufacturer = $this->jsonToProcess->ManufacturerId;

        // Valeur pour l'image
        $imagePath = $this->jsonToProcess->ImagePath;

        // update d'un article
        $updateProduct = "UPDATE t_products SET
                          t_products.ProductName = '".addslashes($productName)."',
                          t_products.FK_ProductColor = '$productColorId',
                          t_products.ProductSize = '$productSize',
                          t_products.ProductDescription = '".addslashes($productDescription)."',
                          t_products.ProductUnitPrice = '$productUnitPrice',
                          t_products.FK_Category = '$FK_Category',
                          t_products.FK_Manufacturer = '$FK_Manufacturer'
                          WHERE t_products.id_Product = '$productId'";
        // Exécution de la requête
        $result = $this->Query($updateProduct);

        // Ajout de la relation article - images
        $updateProductImage = "UPDATE t_products_images
								          SET
                                t_products_images.FK_Product = '$productId',
                                t_products_images.FK_Image = (SELECT t_images.id_Image FROM t_images WHERE t_images.ImagePath = '$imagePath' ORDER BY t_images.id_Image DESC LIMIT 1)
                                WHERE t_products_images.FK_Product = '$productId'";
        // Exécution de la requête
        $this->Query($updateProductImage);

        //--- RSS ---//
        $rssTitle = $productName;
        $rssLink = $productId;
        $rssDescription = addslashes($productDescription);

        // Update
        $rssEntity = new RSS();
        $rssEntity->UpdateRss($rssTitle, $rssLink, $rssDescription);

        // Mise à jour du fichier
        update_fluxRSS($rssEntity);
      }
    }

    // Récupération d'un article avec son ID
    public function GetById()
    {
      // Requête
      $sql = " SELECT * FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category WHERE t_products.id_Product = $this->idToProcess";
       // Exécution de la requête
       $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

       // Retour du résultat
       return $tmpResult;
    }

    // Récupération des détails d'un article avec son ID
    public function GetDetailsById()
    {
      // Tableau
      $articles = [];

      // Requête pour Récupérer les données de l'article voulu
      $sql = "SELECT id_Product, ProductSize, t_products.FK_Category as 'CategoryId', t_products.FK_Manufacturer as 'ManufacturerId', ProductName, FK_ProductColor AS ProductColorId, t_product_color.ProductColor AS ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category WHERE t_products.id_Product = $this->idToProcess";
      // Exécution de la requête
      $tmpResult = $this->Query($sql);
      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {
        // Sortir les données pour chaque "row"
        $cr = 0;
        // Parcourir le résultat
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          // Tableau
          $categories = [];

          // Requête pour récupérer toutes les catégories de l'article (maximum 3 niveaux de catégories)
          $getAllCatForAProcuct = "SELECT tc.id_Category AS 'id1',  tc.CategoryName AS 'name1', tc.IsActive AS 'active1', tc.FK_Category AS 'fk1',
                                    tc1.id_Category AS 'id2', tc1.CategoryName AS 'name2', tc1.isActive AS 'active2', tc1.FK_Category AS 'fk2',
                                    tc2.id_Category AS 'id3', tc2.CategoryName AS 'name3', tc2.isActive AS 'active3', tc2.FK_Category AS 'fk3'
                                    FROM t_products tp
                                    LEFT JOIN t_categories tc ON tc.id_Category = tp.FK_Category
                                    LEFT JOIN t_categories tc1 ON tc1.id_Category = tc.FK_Category
                                    LEFT JOIN t_categories tc2 ON tc2.id_Category = tc1.FK_Category
                                    WHERE tp.id_Product = $this->idToProcess";
          // Exécution de la requête
          $tmpResult2 = $this->Query($getAllCatForAProcuct);
          // Vérifier que l'on reçoit au moins une ligne de données
          if($tmpResult2->rowCount() > 0) {
            // Sortir les données pour chaque "row"
            while($row2 = $tmpResult2->fetch( PDO::FETCH_ASSOC )) {
              $cat1 = [];
              $cat1['id'] = $row2['id1'];
              $cat1['CategoryName'] = $row2['name1'];
              $cat1['IsActive'] = $row2['active1'];
              $cat1['FK_Category'] = $row2['fk1'];

              $cat2 = [];
              $cat2['id'] = $row2['id2'];
              $cat2['CategoryName'] = $row2['name2'];
              $cat2['IsActive'] = $row2['active2'];
              $cat2['FK_Category'] = $row2['fk2'];

              $cat3 = [];
              $cat3['id'] = $row2['id3'];
              $cat3['CategoryName'] = $row2['name3'];
              $cat3['IsActive'] = $row2['active3'];
              $cat3['FK_Category'] = $row2['fk3'];
              // Insertion des catégories dans le tableau "$categories"
              array_push($categories, $cat1, $cat2, $cat3);
            }

          }

          // Insertion des données dans le tableau "$articles"
          $articles[$cr]['id_Product'] = $row['id_Product'];
          $articles[$cr]['ProductName'] = $row['ProductName'];
          $articles[$cr]['ProductColorId'] = $row['ProductColorId'];
          $articles[$cr]['ProductColor'] = $row['ProductColor'];
          $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
          $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
          $articles[$cr]['ProductSize'] = $row['ProductSize'];
          $articles[$cr]['ImageName'] = $row['ImageName'];
          $articles[$cr]['ImagePath'] = $row['ImagePath'];
          $articles[$cr]['ManufacturerId'] = $row['ManufacturerId'];
          $articles[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $articles[$cr]['isActive'] = $row['productIsActive'];
          $articles[$cr]['CategoryId'] = $row['CategoryId'];
          $articles[$cr]['CategoryName'] = $row['CategoryName'];
          $articles[$cr]['Categories'] = $categories;
        }

        // echo de la liste des articles
        return $articles;
      }
    }

    // Récupération de tous les articles
    public function GetAll()
    {
      // Tableau
      $articles = [];

      // Requête pour récuopérer l'ensemble des articles
      $sql = "SELECT id_Product, ProductSize, t_products.FK_Category as 'CategoryId', t_products.FK_Manufacturer as 'ManufacturerId', ProductName, FK_ProductColor AS ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category";
      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);
      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {
        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          // Tableau
          $categories = [];
          // Récupération de l'id de l'article pour récupérer ses catégories
          $id = (int)$row['id_Product'];
          // Requête permettant de récupérer les catégories de l'article
          $getAllCatForAProcuct = "SELECT tc.id_Category AS 'id1',  tc.CategoryName AS 'name1', tc.IsActive AS 'active1', tc.FK_Category AS 'fk1',
                                    tc1.id_Category AS 'id2', tc1.CategoryName AS 'name2', tc1.isActive AS 'active2', tc1.FK_Category AS 'fk2',
                                    tc2.id_Category AS 'id3', tc2.CategoryName AS 'name3', tc2.isActive AS 'active3', tc2.FK_Category AS 'fk3'
                                    FROM t_products tp
                                    LEFT JOIN t_categories tc ON tc.id_Category = tp.FK_Category
                                    LEFT JOIN t_categories tc1 ON tc1.id_Category = tc.FK_Category
                                    LEFT JOIN t_categories tc2 ON tc2.id_Category = tc1.FK_Category
                                    WHERE tp.id_Product = $id";
          // Exécution de la requête + stockage du retour
          $tmpResult2 = $this->Query($getAllCatForAProcuct);
          // Vérifier que l'on reçoit au moins une ligne de données
          if($tmpResult2->rowCount() > 0) {
            // Sortir les données pour chaque "row"
            while($row2 = $tmpResult2->fetch( PDO::FETCH_ASSOC )) {
              $cat1 = [];
              $cat1['id'] = $row2['id1'];
              $cat1['CategoryName'] = $row2['name1'];
              $cat1['IsActive'] = $row2['active1'];
              $cat1['FK_Category'] = $row2['fk1'];

              $cat2 = [];
              $cat2['id'] = $row2['id2'];
              $cat2['CategoryName'] = $row2['name2'];
              $cat2['IsActive'] = $row2['active2'];
              $cat2['FK_Category'] = $row2['fk2'];

              $cat3 = [];
              $cat3['id'] = $row2['id3'];
              $cat3['CategoryName'] = $row2['name3'];
              $cat3['IsActive'] = $row2['active3'];
              $cat3['FK_Category'] = $row2['fk3'];

              // Insertion des catégories dans le tableau "$categories"
              array_push($categories, $cat1, $cat2, $cat3);
            }

          }

          // Insertion des données dans le tableau "$articles"
          $articles[$cr]['id_Product'] = $row['id_Product'];
          $articles[$cr]['ProductName'] = $row['ProductName'];
          $articles[$cr]['ProductColor'] = $row['ProductColor'];
          $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
          $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
          $articles[$cr]['ProductSize'] = $row['ProductSize'];
          $articles[$cr]['ImageName'] = $row['ImageName'];
          $articles[$cr]['ImagePath'] = $row['ImagePath'];
          $articles[$cr]['ManufacturerId'] = $row['ManufacturerId'];
          $articles[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $articles[$cr]['isActive'] = $row['productIsActive'];
          $articles[$cr]['CategoryId'] = $row['CategoryId'];
          $articles[$cr]['CategoryName'] = $row['CategoryName'];
          $articles[$cr]['Categories'] = $categories;
          $cr++;
        }

        // echo de la liste des articles
        return $articles;
      }
    }

    // Récupérer alléatoirement un nombre d'articles voulu (affichage sur la page d'accueil d'articles)
    public function GetRandom()
    {
      // Tableau
      $articles = [];

      // Requête pour récuopérer l'ensemble des articles
      $sql = "SELECT id_Product, ProductSize, t_products.FK_Category as 'CategoryId', t_products.FK_Manufacturer as 'ManufacturerId', ProductName, FK_ProductColor AS ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category
               ORDER BY RAND() LIMIT $this->idToProcess";
      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);
      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {
        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          // Tableau
          $categories = [];
          // Récupération de l'id de l'article pour récupérer ses catégories
          $id = (int)$row['id_Product'];
          // Requête permettant de récupérer les catégories de l'article
          $getAllCatForAProcuct = "SELECT tc.id_Category AS 'id1',  tc.CategoryName AS 'name1', tc.IsActive AS 'active1', tc.FK_Category AS 'fk1',
                                    tc1.id_Category AS 'id2', tc1.CategoryName AS 'name2', tc1.isActive AS 'active2', tc1.FK_Category AS 'fk2',
                                    tc2.id_Category AS 'id3', tc2.CategoryName AS 'name3', tc2.isActive AS 'active3', tc2.FK_Category AS 'fk3'
                                    FROM t_products tp
                                    LEFT JOIN t_categories tc ON tc.id_Category = tp.FK_Category
                                    LEFT JOIN t_categories tc1 ON tc1.id_Category = tc.FK_Category
                                    LEFT JOIN t_categories tc2 ON tc2.id_Category = tc1.FK_Category
                                    WHERE tp.id_Product = $id";
          // Exécution de la requête + stockage du retour
          $tmpResult2 = $this->Query($getAllCatForAProcuct);
          // Vérifier que l'on reçoit au moins une ligne de données
          if($tmpResult2->rowCount() > 0) {
            // Sortir les données pour chaque "row"
            while($row2 = $tmpResult2->fetch( PDO::FETCH_ASSOC )) {
              $cat1 = [];
              $cat1['id'] = $row2['id1'];
              $cat1['CategoryName'] = $row2['name1'];
              $cat1['IsActive'] = $row2['active1'];
              $cat1['FK_Category'] = $row2['fk1'];

              $cat2 = [];
              $cat2['id'] = $row2['id2'];
              $cat2['CategoryName'] = $row2['name2'];
              $cat2['IsActive'] = $row2['active2'];
              $cat2['FK_Category'] = $row2['fk2'];

              $cat3 = [];
              $cat3['id'] = $row2['id3'];
              $cat3['CategoryName'] = $row2['name3'];
              $cat3['IsActive'] = $row2['active3'];
              $cat3['FK_Category'] = $row2['fk3'];

              // Insertion des catégories dans le tableau "$categories"
              array_push($categories, $cat1, $cat2, $cat3);
            }
          }
          // Insertion des données dans le tableau "$articles"
          $articles[$cr]['id_Product'] = $row['id_Product'];
          $articles[$cr]['ProductName'] = $row['ProductName'];
          $articles[$cr]['ProductColor'] = $row['ProductColor'];
          $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
          $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
          $articles[$cr]['ProductSize'] = $row['ProductSize'];
          $articles[$cr]['ImageName'] = $row['ImageName'];
          $articles[$cr]['ImagePath'] = $row['ImagePath'];
          $articles[$cr]['ManufacturerId'] = $row['ManufacturerId'];
          $articles[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $articles[$cr]['isActive'] = $row['productIsActive'];
          $articles[$cr]['CategoryId'] = $row['CategoryId'];
          $articles[$cr]['CategoryName'] = $row['CategoryName'];
          $articles[$cr]['Categories'] = $categories;
          $cr++;
        }
        // echo de la liste des articles
        return $articles;
      }
    }

    // Récupération de tous les Manufacturer
    public function GetAllManufacturer() {
      // Tableau
      $manufacturers = [];

      // Requête pour récupérer la liste des marques par ordre alphabétique
      $sql = "SELECT * FROM t_manufacturers ORDER BY t_manufacturers.ManufacturerName ASC";

      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $manufacturers[$cr]['id_Manufacturer'] = $row['id_Manufacturer'];
          $manufacturers[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $cr++;
        }
        // echo de la liste des articles
        return $manufacturers;
      }
    }

    // Récupération de toutes les couleurs
    public function GetAllColors() {
      // Tableau
      $colors = [];
      // Requête pour récupérer l'ensemble des couleurs par ordre alphabétique
      $sql = "SELECT * FROM t_product_color ORDER BY t_product_color.ProductColor ASC";
      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);
      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $colors[$cr]['id_color'] = $row['id_color'];
          $colors[$cr]['ProductColor'] = $row['ProductColor'];
          $cr++;
        }
        // echo de la liste des articles
        return $colors;
      }
    }

    // Mise à jour du statut d'un article
    public function UpdateProductStatusMBAD(){
      // Vérifier que l'on reçoit bien les données voulues
      if($this->jsonToProcess !=null)
      {
        // Récupération des valeurs pour l'article
        $productID = $this->jsonToProcess->id_Product;
        $productStatus = $this->jsonToProcess->isActive;

        //Update
        $updateProductStatus = "UPDATE
        t_products
        SET
        t_products.isActive = '$productStatus'
        WHERE
        t_products.id_Product = '$productID'";
        // Exécution de la requête
        $this->Query($updateProductStatus);
      }
    }

    // Vérification du chemin d'une image lors d'une insertion ou modification
    public function CheckImagePathAvabilityMBAD(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['ImagePath'])){
        // Assignation des valeurs
        $imagePath = $_GET['ImagePath'];
      }
      // Requête
      $sql = "SELECT * FROM t_images WHERE ImagePath = '$imagePath'";
      // Exécution de la requête + stockage du retour
      $tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
      // Si on reçoit qqch en retour de la requête, cela veut dire que le chemin existe déjà => code erreure
      if($tmpUser != null)
      {
        return http_response_code(409);
      }
      else {
        return $tmpUser;
      }
    }

    // Ajout d'une image
    public function UploadImageMBAD()
    {
      // Vérifier que l'on reçoit bien un fichier dans la requête HTTP
      if($_FILES != null)
      {
        // Chemin de où sont stockées les images
        $target_dir = "../Images/Products/";
        // Chemin complet avec le nom du fichier reçu
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        // Boolean qui permettra de dire si on peut ou pas enregistrer l'image
        $uploadOk = 1;
        // Extension du fichier reçu
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        // Nom du fichier reçu
        $imageFileName = strtolower(pathinfo($target_file,PATHINFO_FILENAME));
        // Nom complet : nom + extension
        $fileName = $_FILES["image"]["name"];

        // Vérifier si l'image existe déjà
        if(file_exists($target_file))
        {
          $uploadOk = 0;
        }

        // Définir une taille limite pour les images si plus grande que 500 KB
        if($_FILES["image"]["size"] > 500000)
        {
          $uploadOk = 0;
        }

        // Définir les types de fichiers voulues (png, jpg, jpeg, gif)
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif")
        {
          $uploadOk = 0;
        }
        // Résultats
        if ($uploadOk == 0) {
          // Retourner une erreur
        } else {
          // Déplacement du fichier vers le répertoire voulu et check si ça c'est correctement passé
          if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_file))
          {
            // Requête pour voir si le fichier existe déjà en bdd ou non
            $sql0 = "SELECT * FROM t_images WHERE t_images.ImagePath= '$fileName'";
            // Exécution de la requête + stockage du retour
            $tmpResult = ($this->Query($sql0)->fetch( PDO::FETCH_ASSOC));
            // Si le retour est égal à NULL cela veut dire que l'image n'existe pas en bdd, on peut donc l'insert
            if($tmpResult==null){
              // Ajout des informations de l'image en DB
              $sql = "INSERT INTO t_images (t_images.ImageName, t_images.ImagePath)
              VALUES ( '$imageFileName','$fileName')";
              $this->Query($sql);
            }else{
              // Cela signifie que l'image existe déjà en bdd => nme retourne rien
              return;
            }
          }
        }
      }
    }

    // Function pour vérifier si qqn utilise un formulaire de modification d'un article
    public function LockCheckMBAD(){
      // Requête
      $sql = " SELECT LockedBy FROM t_lock_product
      WHERE FK_Product = $this->idToProcess";
      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    //  Mettre à jour le le temps de lock au temps actuel
    public function UpdateLockMBAD(){
      // Requête
      $sql = "UPDATE  	t_lock_product
      SET
      t_lock_product.LockTime = NOW()
      WHERE
      t_lock_product.FK_Product = $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    // Ajout d'un lock pour l'édition d'un formulaire
    public function AddLockMBAD(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $username= $_GET['username'];
        // Requête
        $sql = "INSERT INTO t_lock_product (LockedBy, Fk_Product)
        VALUES ('$username', $this->idToProcess)";

        // Exécution de la requête + stockage du retour
        $tmpResult = ($this->Query($sql));

        // Retour du résultat
        return $tmpResult;
      }
    }

    // Libérer le vérouillage de l'édition du formulaire avec le nom d'utilisateur
    public function ReleaseLockMBAD(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $username= $_GET['username'];
        // Requête
        $sql = "DELETE FROM t_lock_product WHERE FK_Product= $this->idToProcess AND LockedBy= '$username'";
        // Exécution de la requête + stockage du retour
        $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour du résultat
        return $tmpResult;
      }
    }

    // Forcer la suppression du vérouillage du formulaire
    public function ForceReleaseLockMBAD(){
      // Requête
      $sql = "DELETE FROM t_lock_product WHERE FK_Product= $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;

    }

    // Nettoyer la table de vérouillage
    public function CleanupLocks(){
      // Requête
      $sql = "DELETE FROM t_lock_product WHERE TIME_TO_SEC(LockTime)+600 <= TIME_TO_SEC(NOW())";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql));

      // Retour du résultat
      return $tmpResult;
    }
}
