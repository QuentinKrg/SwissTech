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

      $sql = "SELECT * FROM t_categories tc ORDER BY tc.FK_Category IS NULL DESC, tc.CategoryName ASC";

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

    // Récupération des informations d'une catégorie avec son id
    public function GetCategoryById()
    {
      // Requête
      $sql = "SELECT t_categories.id_Category AS 'id', t_categories.CategoryName, t_categories.isActive, t_categories.FK_Category
      FROM t_categories WHERE t_categories.id_Category = $this->idToProcess";

      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
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
        $sql = "SELECT * FROM t_categories tc where tc.FK_Category = $this->idToProcess ORDER BY tc.CategoryName ASC";

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

	public function GetAllSubCategories()
    {

        $sql = "SELECT * FROM t_categories where FK_Category IS NOT NULL ORDER BY t_categories.CategoryName ASC";

        $tmpResult = $this->Query($sql);

        if($tmpResult->rowCount() > 0) {

          // Sortir les données pour chaque "row"
          $cr = 0;
          while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
            $SubCategories[$cr]['id'] = $row['id_Category'];
            $SubCategories[$cr]['CategoryName'] = $row['CategoryName'];
            $SubCategories[$cr]['IsActive'] = $row['isActive'];
            $SubCategories[$cr]['FK_Category'] = $row['FK_Category'];
            $cr++;
          }
          // echo de la liste des articles
          return $SubCategories;
        }

    }

	public function UpdateCategory()
	{

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

	public function AddCategory()
	{


		// Récupération des données reçues
		$CategoryName = $this->jsonToProcess->CategoryName;

		$checkCategoryName = "SELECT CategoryName FROM t_categories
						WHERE CategoryName='$CategoryName'";

		$tmpResult = $this->Query($checkCategoryName)->fetch(PDO::FETCH_ASSOC);

						if($tmpResult!=null){
							return http_response_code(409);
						}
		if($this->jsonToProcess->FK_Category!=NULL){
		$FK_Category = $this->jsonToProcess->FK_Category;

        $addCategory = "INSERT INTO t_categories
						(CategoryName, FK_Category)
						VALUES ( '$CategoryName','$FK_Category')";
		}else{

        $addCategory = "INSERT INTO t_categories
						(CategoryName)
						VALUES ( '$CategoryName')";
		}


        $this->Query($addCategory);
	}

	public function UpdateCategoryStatus()
	{
			$id = $this->jsonToProcess->id;
			// Récupération des données reçues
			$isActive = $this->jsonToProcess->IsActive;

					//UPDATE Billing Address
					$updateCat = "UPDATE
										t_categories
										SET
										isActive ='$isActive'
												WHERE id_Category = '$id'";

					$this->Query($updateCat);

	}


  // Récupération de la catégorie parente à cella sélectionnée
  public function GetPreviousCategory()
  {
    $sql = "SELECT t_categories.id_Category AS 'id', t_categories.CategoryName, t_categories.isActive, t_categories.FK_Category
    FROM t_categories WHERE t_categories.id_Category = (SELECT t_categories.FK_Category FROM t_categories WHERE t_categories.id_Category = $this->idToProcess)";

    $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

    // Retour du résultat
    return $tmpResult;
  }

}
