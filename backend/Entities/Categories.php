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

      $sql = "SELECT * FROM t_categories tc WHERE tc.FK_Category IS NULL";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $MainCategories[$cr]['id'] = $row['id_Category'];
          $MainCategories[$cr]['CategoryName'] = $row['CategoryName'];
          $MainCategories[$cr]['IsActive'] = $row['isActive'];
          $MainCategories[$cr]['FK_Category'] = $row['FK_Category'];
          $cr++;
        }
        // echo de la liste des articles
        return $MainCategories;
      }
      // Fermeture de la connexion
      return $tmpResult;
    }

    public function GetAllCategoriesWithCategory()
    {
      if($this->idToProcess !=null) {
        $sql = "SELECT * FROM t_categories tc where tc.FK_Category = $this->idToProcess";

        $tmpResult = $this->Query($sql);

        if($tmpResult->rowCount() > 0) {

          // Sortir les données pour chaque "row"
          $cr = 0;
          while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
            $MainCategories[$cr]['id'] = $row['id_Category'];
            $MainCategories[$cr]['CategoryName'] = $row['CategoryName'];
            $MainCategories[$cr]['IsActive'] = $row['isActive'];
            $MainCategories[$cr]['FK_Category'] = $row['FK_Category'];
            $cr++;
          }
          // echo de la liste des articles
          return $MainCategories;
        }
        // Fermeture de la connexion
        return $tmpResult;

      }
    }
}
