<?php
/**
 * User: Quentin Krenger
 * Date: 06.03.2020
 * Time: 12:44
 */

class Categories extends Entity
{

    public function  __construct()
    {

    }


    // Récupération de tous les articles
    public function GetAllMain()
    {
      $MainCategories = [];

      $sql = "SELECT * FROM t_categories  tc WHERE tc.FK_Category IS NULL";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $MainCategories[$cr]['id'] = $row['id_Category'];
          $articles[$cr]['CategoryName'] = $row['CategoryName'];
          $articles[$cr]['IsActive'] = $row['isActive'];
          $articles[$cr]['FK_Category'] = $row['FK_Category'];
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
