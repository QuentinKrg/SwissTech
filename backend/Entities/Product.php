<?php
/**
 * User: Quentin Krenger
 * Date: 21.01.2020
 * Time: 12:44
 */

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
    public function AddProtected()
    {

      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
        $name = $this->jsonToProcess->Name;
        $price = $this->jsonToProcess->Price;

        // Requête sql
        $sql = "INSERT INTO t_products (ProductName, ProductUnitPrice) VALUES ('$name', '$price')";

        $this->Query($sql);
        }
    }

    // Suppression d'un article
    public function Delete()
    {
      $sql = "DELETE FROM article WHERE id = '$this->idToProcess' LIMIT 1";

      $this->Query($sql);
    }

    // Mise à jour d'un article
    public function Update()
    {

      $id = $this->jsonToProcess->id;
      $name = $this->jsonToProcess->Name;
      $price = $this->jsonToProcess->Price;

      $sql = "UPDATE article SET Name = '$name', Price = '$price' WHERE id = '$id'";

      $this->Query($sql);
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
      $sql = " SELECT * FROM t_products
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

      $sql = "SELECT id_Product, ProductName, ProductColor, ProductDescription, ProductUnitPrice,ImageName, ImagePath,ManufacturerName, t_products.isActive AS 'productIsActive',CategoryName FROM t_products
               LEFT JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
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
          $articles[$cr]['ImageName'] = $row['ImageName'];
          $articles[$cr]['ImagePath'] = $row['ImagePath'];
          $articles[$cr]['ManufacturerName'] = $row['ManufacturerName'];
          $articles[$cr]['isActive'] = $row['productIsActive'];
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

}
