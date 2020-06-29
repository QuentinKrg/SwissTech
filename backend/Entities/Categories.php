<?php
/*
  Classe pour la gestion des catégories, elle hérite de la classe "Entity"
*/


class Categories extends Entity
{

  // Construction
  public function  __construct()
  {

  }

	// Récupération de tous les catégories
	public function GetAll()
    {
      // Tableau
      $Categories = [];

      // Requête
      $sql = "SELECT * FROM t_categories tc ORDER BY tc.FK_Category IS NULL DESC, tc.CategoryName ASC";

      // Execution de la requête et stockage du retour
      $tmpResult = $this->Query($sql);

      // Vérifier que l'on reçoit bien qqch en retour
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
    }

    // Récupération des informations d'une catégorie avec son id
    public function GetCategoryById()
    {
      // Requête
      $sql = "SELECT t_categories.id_Category AS 'id', t_categories.CategoryName, t_categories.isActive, t_categories.FK_Category
      FROM t_categories WHERE t_categories.id_Category = $this->idToProcess";

      // Execution de la requête et stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    // Récupération de tous les catégories principalles
    public function GetAllMain()
    {
      // Tableau
      $MainCategories = [];

      // Requête
      $sql = "SELECT * FROM t_categories tc WHERE tc.FK_Category IS NULL";

      // Execution de la requête et stockage du retour
      $tmpResult = $this->Query($sql);

      // Vérifier que l'on reçois bien qqch
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

    // Récupération de tous les sous-catégories avec l'id de la catégorie parente
    public function GetAllCategoriesWithCategory()
    {
      // Vérifier que l'on reçoit bien un id en paramètre
      if($this->idToProcess !=null) {
        // Requête
        $sql = "SELECT * FROM t_categories tc where tc.FK_Category = $this->idToProcess ORDER BY tc.CategoryName ASC";

        // Execution de la requête et stockage du retour
        $tmpResult = $this->Query($sql);

        // Vérifier que l'on reçoit bien qqch
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

    // Récupération de toutes les catégories qui ne sont pas des catégories principales
    public function GetAllSubCategories()
    {
        // Requête
        $sql = "SELECT * FROM t_categories where FK_Category IS NOT NULL ORDER BY t_categories.CategoryName ASC";

        // Execution de la requête et stockage du retour
        $tmpResult = $this->Query($sql);

        // Vérifier que l'on reçoit bien qqch
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

    // Mettre à jour les données d'un catégorie
    public function UpdateCategoryMBAD()
    {
      // Vérifier que l'on reçoit bien le paramètre ID
      if(isset($_GET['id'])){
        $id = $_GET['id'];

        // Récupération des données reçues
        $CategoryName = $this->jsonToProcess->CategoryName;

        //UPDATE Billing Address : requête
        $updateCat = "UPDATE
        t_categories
        SET
        CategoryName ='$CategoryName'
        WHERE id_Category = '$id'";

        // Execution de la requête
        $this->Query($updateCat);
      }
    }

    // Ajout d'une catégorie
    public function AddCategoryMBAD()
    {
        // Récupération des données reçues
        $CategoryName = $this->jsonToProcess->CategoryName;

        // Requête pour vérifier la catégorie
        $checkCategoryName = "SELECT CategoryName FROM t_categories
        WHERE CategoryName='$CategoryName'";

        // Execution de la requête et stockage du retour
        $tmpResult = $this->Query($checkCategoryName)->fetch(PDO::FETCH_ASSOC);

        // Vérifier que la catégorie existe bel et bien, sinon retourne une erreure
        if($tmpResult!=null){
          return http_response_code(409);
        }

        // Vérifier que FK_Category n'est pas null
        // Si n'est pas null = à une catégorie parente
        if($this->jsonToProcess->FK_Category!=NULL){

            $FK_Category = $this->jsonToProcess->FK_Category;

            // Requête d'ajout
            $addCategory = "INSERT INTO t_categories
            (CategoryName, FK_Category)
            VALUES ( '$CategoryName','$FK_Category')";
        }
        // Sinon cela veut dire que c'est une catégorie principale
        else {
            // Requête d'ajout de catégorie principale
            $addCategory = "INSERT INTO t_categories
            (CategoryName)
            VALUES ( '$CategoryName')";
        }

        // Execution de la requête
        $this->Query($addCategory);
	}

  // Mise à jour du status d'une catégorie (active, innactive)
	public function UpdateCategoryStatusMBAD()
	{
      // Récupération des données reçues en paramètre
			$id = $this->jsonToProcess->id;
			$isActive = $this->jsonToProcess->IsActive;

      // Requête
			//UPDATE Billing Address
			$updateCat = "UPDATE
								t_categories
								SET
								isActive ='$isActive'
										WHERE id_Category = '$id'";
      // Execution de la requête
			$this->Query($updateCat);
	}

  // Récupération de la catégorie parente de celle sélectionnée
  public function GetPreviousCategory()
  {
    // Requête pour récupérer la catégorie parente
    $sql = "SELECT t_categories.id_Category AS 'id', t_categories.CategoryName, t_categories.isActive, t_categories.FK_Category
    FROM t_categories WHERE t_categories.id_Category = (SELECT t_categories.FK_Category FROM t_categories WHERE t_categories.id_Category = $this->idToProcess)";

    // Execution de la requête et stockage du retour
    $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

    // Retour du résultat
    return $tmpResult;
  }
}
