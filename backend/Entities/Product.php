<?php
/**
 * User: Quentin Krenger
 * Date: 21.01.2020
 * Time: 12:44
 */

 // include de la classe rss
 include("RSS.php");

 // aller chercher le fichier php qui contient le code permettant de rafraichir le flux RSS
 include_once("./UpdateRss.php");

class Product extends Entity
{

    public function  __construct()
    {

    }

    public function TestMBAD()
    {
      return "woooow";
    }

    // Ajout d'un article : doit avoir un token
    public function AddProduct()
    {
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

        $this->Query($addProduct);

        // Récupération de l'id de l'article qui vient d'être ajouté
        $getLastProductAddedId = "SELECT t_products.id_Product FROM t_products ORDER BY  t_products.id_Product DESC LIMIT 1";
        $productId = ($this->Query($getLastProductAddedId)->fetchColumn());

        // Ajout de la relation article - images
        $addProductImage = "INSERT INTO t_products_images (FK_Product, FK_Image)
                            VALUES ('$productId', (SELECT t_images.id_Image FROM t_images WHERE t_images.ImagePath = '$imagePath' ORDER BY t_images.id_Image DESC LIMIT 1))";
        $this->Query($addProductImage);

        //--- RSS ---//
        $rssTitle = $productName;
        $rssLink = $productId;
        $rssGuid = time();
        $rssDescription = $productDescription;

        // Ajout
        $rssEntity = new RSS();
        $rssEntity->AddRss($rssTitle,$rssLink,$rssGuid,$rssDescription);

        // Mise à jour du fichier
        update_fluxRSS($rssEntity);



      }
    }


    // Mise à jour d'un article
    public function UpdateProduct()
    {

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
        $result = $this->Query($updateProduct);

        // Ajout de la relation article - images
        $updateProductImage = "UPDATE t_products_images
								          SET
                                t_products_images.FK_Product = '$productId',
                                t_products_images.FK_Image = (SELECT t_images.id_Image FROM t_images WHERE t_images.ImagePath = '$imagePath' ORDER BY t_images.id_Image DESC LIMIT 1)
                                WHERE t_products_images.FK_Product = '$productId'";

        $this->Query($updateProductImage);

        //--- RSS ---//
        $rssTitle = $productName;
        $rssLink = $productId;
        $rssDescription = $productDescription;

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
      $sql = " SELECT * FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category WHERE t_products.id_Product = $this->idToProcess";

       $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

       // Retour du résultat
       return $tmpResult;
    }

    // Récupération des détails d'un article avec son ID
    public function GetDetailsById()
    {
      // TODO Récupération de toutes les images
      $sql = " SELECT id_Product, ProductSize, t_products.FK_Category as 'CategoryId', t_products.FK_Manufacturer as 'ManufacturerId', ProductName, t_product_color.ProductColor AS ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
			         LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category WHERE t_products.id_Product = $this->idToProcess";

       $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

       // Retour du résultat
       return $tmpResult;
    }

    // Récupération de tous les articles
    public function GetAll()
    {
      $articles = [];

      $sql = "SELECT id_Product, ProductSize, t_products.FK_Category as 'CategoryId', t_products.FK_Manufacturer as 'ManufacturerId', ProductName, FK_ProductColor AS ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {
        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $categories = [];
          $id = (int)$row['id_Product'];

          $getAllCatForAProcuct = "SELECT tc.id_Category AS 'id1',  tc.CategoryName AS 'name1', tc.IsActive AS 'active1', tc.FK_Category AS 'fk1',
                                    tc1.id_Category AS 'id2', tc1.CategoryName AS 'name2', tc1.isActive AS 'active2', tc1.FK_Category AS 'fk2',
                                    tc2.id_Category AS 'id3', tc2.CategoryName AS 'name3', tc2.isActive AS 'active3', tc2.FK_Category AS 'fk3'
                                    FROM t_products tp
                                    LEFT JOIN t_categories tc ON tc.id_Category = tp.FK_Category
                                    LEFT JOIN t_categories tc1 ON tc1.id_Category = tc.FK_Category
                                    LEFT JOIN t_categories tc2 ON tc2.id_Category = tc1.FK_Category
                                    WHERE tp.id_Product = $id";

          $tmpResult2 = $this->Query($getAllCatForAProcuct);

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


              array_push($categories, $cat1, $cat2, $cat3);
            }

          }

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
      // Fermeture de la connexion
      return $tmpResult;
    }

    // Retourne list d'article lors d'une recherche
    public function GetOnSearch() {
      echo "ok";
      if (isset($_GET["toSearch"]) != "" )
      {
        return "wesh";
      }
    }

    // Récupérer alléatoirement un nombre d'articles voulue
    public function GetRandom()
    {
      $articles = [];

      $sql = " SELECT * FROM t_products
				LEFT JOIN t_product_color ON t_products.FK_ProductColor = t_product_color.id_color
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               LEFT JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               LEFT JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               LEFT JOIN t_categories ON t_products.FK_Category = t_categories.id_Category
               ORDER BY RAND() LIMIT $this->idToProcess";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $articles[$cr]['id_Product'] = $row['id_Product'];
          $articles[$cr]['ProductName'] = $row['ProductName'];
          $articles[$cr]['ProductColor'] = $row['ProductColor'];
          $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
          $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
          $articles[$cr]['ImageName'] = $row['ImageName'];
          $articles[$cr]['ImagePath'] = $row['ImagePath'];
          $articles[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $articles[$cr]['CategoryName'] = $row['CategoryName'];
          $cr++;
        }
        // echo de la liste des articles
        return $articles;
      }
    }

    // Récupération de tous les Manufacturer
    public function GetAllManufacturer() {
      $manufacturers = [];

      $sql = "SELECT * FROM t_manufacturers";

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

 // Récupération de tous les Manufacturer
    public function GetAllColors() {
      $Colors = [];

      $sql = "SELECT * FROM t_product_color";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $Colors[$cr]['id_color'] = $row['id_color'];
          $Colors[$cr]['ProductColor'] = $row['ProductColor'];
          $cr++;
        }
        // echo de la liste des articles
        return $Colors;
      }
	}
    // Mise à jour du statut d'un article
    public function UpdateProductStatus(){
      if($this->jsonToProcess !=null)
      {
        $productID = $this->jsonToProcess->id_Product;
    	  $productStatus = $this->jsonToProcess->isActive;


  			//Update
  			$updateProductStatus = "UPDATE
  									t_products
  								SET
  									t_products.isActive = '$productStatus'
  								WHERE
  									t_products.id_Product = '$productID'";
  			$this->Query($updateProductStatus);
      }
  	}

	public function CheckImagePathAvability(){
		if(isset($_GET['ImagePath'])){
			$imagePath = $_GET['ImagePath'];
		}
		$sql = "SELECT * FROM t_images WHERE ImagePath = '$imagePath'";
		$tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);

		if($tmpUser != null)
		  {
			return http_response_code(409);
		  }
		else {
			return $tmpUser;
		}
	}

    // Création d'un article
    public function UploadImage()
    {

      if($_FILES != null)
      {
	      $target_dir = "../Images/Products/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $imageFileName = strtolower(pathinfo($target_file,PATHINFO_FILENAME));
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

          if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_file))
          {

  			$sql0 = "SELECT * FROM t_images WHERE t_images.ImagePath= '$fileName'";
  			$tmpResult = ($this->Query($sql0)->fetch( PDO::FETCH_ASSOC));
  			if($tmpResult==null){
              // Ajout des informations de l'image en DB
              $sql = "INSERT INTO t_images (t_images.ImageName, t_images.ImagePath)
                      VALUES ( '$imageFileName','$fileName')";
              $this->Query($sql);
			}else{
				return;
			}

          } else {
            // Retourner une erreur
          }
        }
      }
    }

	public function LockCheck(){
		$sql = " SELECT LockedBy FROM t_lock_product
					WHERE FK_Product = $this->idToProcess";

       $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

       // Retour du résultat
       return $tmpResult;
	}
	public function UpdateLock(){

		$sql = "UPDATE  	t_lock_product
  			SET
  					t_lock_product.LockTime = NOW()
  			WHERE
  					t_lock_product.FK_Product = $this->idToProcess";

		$tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

       // Retour du résultat
       return $tmpResult;
	}
	public function AddLock(){
		if(isset($_GET['username'])){
			$username= $_GET['username'];
			$sql = "INSERT INTO t_lock_product (LockedBy, Fk_Product)
                        VALUES ('$username', $this->idToProcess)";

			$tmpResult = ($this->Query($sql));

		   // Retour du résultat
		   return $tmpResult;
		}

	}
	public function ReleaseLock(){
		if(isset($_GET['username'])){
			$username= $_GET['username'];
			$sql = "DELETE FROM t_lock_product WHERE FK_Product= $this->idToProcess AND LockedBy= '$username'";

			$tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

		   // Retour du résultat
		   return $tmpResult;
		}

	}
	public function ForceReleaseLock(){

			$sql = "DELETE FROM t_lock_product WHERE FK_Product= $this->idToProcess";

			$tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

		   // Retour du résultat
		   return $tmpResult;

	}
	public function CleanupLocks(){
	    $sql = "DELETE FROM t_lock_product WHERE TIME_TO_SEC(LockTime)+600 <= TIME_TO_SEC(NOW())";

		$tmpResult = ($this->Query($sql));

	   // Retour du résultat
	   return $tmpResult;
	}
}
