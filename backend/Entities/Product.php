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
      $articles = [];

      $sql = " SELECT * FROM t_products
               INNER JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               INNER JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               INNER JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               INNER JOIN t_categories ON t_products.FK_Category = t_categories.id_Category WHERE t_products.id_Product = $this->idToProcess";

               $tmpResult = $this->Query($sql);

       if($tmpResult->rowCount() > 0) {

         // Sortir les données pour chaque "row"
         $cr = 0;
         while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
           $articles[$cr]['id'] = $row['id_Product'];
           $articles[$cr]['ProductName'] = $row['ProductName'];
           $articles[$cr]['ProductColor'] = $row['ProductColor'];
           $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
           $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
           $articles[$cr]['ProductImageName'] = $row['ImageName'];
           $articles[$cr]['ProductImagePath'] = $row['ImagePath'];
           $articles[$cr]['ProductManufacturer'] = $row['ManufacturerName'];
           $articles[$cr]['ProductCategory'] = $row['CategoryName'];
           $cr++;
         }
         // echo de la liste des articles
         return $articles;
       }

     // Fermeture de la connexion
     return $tmpResult;
    }

    // Récupération de tous les articles
    public function GetAll()
    {
      $articles = [];

      $sql = "SELECT * FROM t_products";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $articles[$cr]['id'] = $row['id_Product'];
          $articles[$cr]['Name'] = $row['ProductName'];
          $articles[$cr]['Price'] = $row['ProductUnitPrice'];
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
               INNER JOIN t_products_images ON t_products.id_Product = t_products_images.FK_Product
               INNER JOIN t_images ON t_products_images.FK_Image = t_images.id_Image
               INNER JOIN t_manufacturers ON t_products.FK_Manufacturer = t_manufacturers.id_Manufacturer
               INNER JOIN t_categories ON t_products.FK_Category = t_categories.id_Category
               ORDER BY RAND() LIMIT $this->idToProcess";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $articles[$cr]['id'] = $row['id_Product'];
          $articles[$cr]['ProductName'] = $row['ProductName'];
          $articles[$cr]['ProductColor'] = $row['ProductColor'];
          $articles[$cr]['ProductDescription'] = $row['ProductDescription'];
          $articles[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
          $articles[$cr]['ProductImageName'] = $row['ImageName'];
          $articles[$cr]['ProductImagePath'] = $row['ImagePath'];
          $articles[$cr]['ProductManufacturer'] = $row['ManufacturerName'];
          $articles[$cr]['ProductCategory'] = $row['CategoryName'];
          $cr++;
        }
        // echo de la liste des articles
        return $articles;
      }
      // Fermeture de la connexion
      return $tmpResult;
    }

}
