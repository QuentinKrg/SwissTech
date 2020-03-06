<?php
/**
 * User: Quentin Krenger
 * Date: 21.01.2020
 * Time: 12:44
 */

class Article extends Entity
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

    // Récupérer alléatoirement un nombre d'articles voulue
    public function GetRandom()
    {
      $articles = [];

      $sql = "SELECT * FROM t_products ORDER BY RAND() LIMIT $this->idToProcess";

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
    // Récupération d'un article avec son id
    public function GetById()
    {
      $sql = "SELECT * FROM article WHERE id = '$this->idToProcess' LIMIT 1";
      echo json_encode($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
    }
}
