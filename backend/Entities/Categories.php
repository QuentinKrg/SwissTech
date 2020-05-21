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
	// Récupération de tous les catégories
	public function GetAll()
    {
      $Categories = [];

      $sql = "SELECT * FROM t_categories";

      $tmpResult = $this->Query($sql);

      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $Categories[$cr]['id'] = $row['id_Category'];
          $Categories[$cr]['CategoryName'] = $row['CategoryName'];
          $Categories[$cr]['IsActive'] = $row['isActive'];
          $Categories[$cr]['FK_Category'] = $row['FK_Category'];
          $cr++;
        }
        // echo de la liste des articles
        return $Categories;
      }
      // Fermeture de la connexion
      return $tmpResult;
    }
    // Récupération de tous les catégories principalles
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
	// Récupération de tous les sous-catégories
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

      }
    }
	public function UpdateCategory(){
	
		if(isset($_GET['id'])){
			$id = $_GET['id'];
			// Récupération des données reçues
			$CategoryName = $this->jsonToProcess->CategoryName;
			
					//UPDATE Billing Address
					$updateCat = "UPDATE
										t_categories
										SET
										CategoryName ='$CategoryName'
												WHERE id_Category = '$id'";
												
					$this->Query($updateCat);
		}
	}
}
