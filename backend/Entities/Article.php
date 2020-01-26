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

    // Ajout d'un article
    public function Add()
    {

      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
        $name = $this->jsonToProcess->Name;
        $price = $this->jsonToProcess->Price;

        // Requête sql
        $sql = "INSERT INTO article (Name, Price) VALUES ('$name', '$price')";

        $resultat = $this->Query($sql);

        }
    }

    // Suppression d'un article
    public function Delete()
    {
      $sql = "DELETE FROM article WHERE id = '$this->idToProcess' LIMIT 1";

      $this->Query($this->dbconnection, $sql);
    }

    // Mise à jour d'un article
    public function Update()
    {

      $id = $this->jsonToProcess->id;
      $name = $this->jsonToProcess->Name;
      $price = $this->jsonToProcess->Price;

      $sql = "UPDATE article SET Name = '$name', Price = '$price' WHERE id = '$id'";

      $this->Query($this->dbconnection, $sql);
    }

    // Récupération de tous les articles
    public function GetAll()
    {
      $articles = [];

      $sql = "SELECT * FROM article";

      $tmpResult = $this->Query($this->dbconnection, $sql);

      if(mysqli_num_rows($tmpResult) > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = mysqli_fetch_assoc($tmpResult)) {
          $articles[$cr]['id'] = $row['id'];
          $articles[$cr]['name'] = $row['Name'];
          $articles[$cr]['price'] = $row['Price'];
          $cr++;
        }
        // echo de la liste des articles
        echo json_encode($articles);
      }
      // Fermeture de la connexion
      mysqli_close($this->dbconnection);
      return $tmpResult;
    }

    // Récupération d'un article avec son id
    public function GetById()
    {
      $sql = "SELECT * FROM article WHERE id = '$this->idToProcess' LIMIT 1";

      echo json_encode(mysqli_fetch_assoc($this->Query($this->dbconnection, $sql)));
    }
}
