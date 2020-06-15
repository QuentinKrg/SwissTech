<?php
/*
  Classe pour la gestion des commentaires, elle hérite de la classe "Entity"
*/

class Comments extends Entity
{
    // Construction
    public function  __construct()
    {

    }

    // Récupération de tous les commentaires d'un article avec son ID
    public function getAllProductsComments()
    {
      // Tableau
      $comments = [];

      // Requête
      $sql = "SELECT * FROM t_comments
              INNER JOIN t_customers ON t_comments.FK_Customer = t_customers.id_customer
              WHERE t_comments.FK_Product = $this->idToProcess ORDER BY t_comments.CommentDate DESC";

      // Execution de la requête et stockage du retour
      $tmpResult = $this->Query($sql);

      // Vérifier que l'on récupère bien qqch
      if($tmpResult->rowCount() > 0) {

         // Sortir les données pour chaque "row"
         $cr = 0;
         while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
           $comments[$cr]['id_Comment'] = $row['id_Comment'];
           $comments[$cr]['CommentValue'] = $row['CommentValue'];
           $comments[$cr]['CommentDate'] = $row['CommentDate'];
           $comments[$cr]['isActive'] = $row['isActive'];
           $comments[$cr]['FK_Product'] = $row['FK_Product'];
           $comments[$cr]['FK_Customer'] = $row['FK_Customer'];
           $comments[$cr]['CustomerName'] = $row['CustomerName'];
           $comments[$cr]['CustomerLastName'] = $row['CustomerLastName'];
           $cr++;
         }
         // echo de la liste des commeentaires
         return $comments;
       }
    }

    // Ajout d'un commentaire
    public function addComment()
    {
      // Vérifier que l'on reçoit bien des données à traiter
      if($this->jsonToProcess !=null)
      {
        // Récupération et assignation des données reçues
        $CommentValue = htmlspecialchars($this->jsonToProcess->CommentValue);
        $FK_Product = $this->jsonToProcess->FK_Product;
        $FK_Customer = $this->jsonToProcess->FK_Customer;

        // Requête d'ajout de commentaire
        $sql = "INSERT INTO t_comments (CommentValue, FK_Product, FK_Customer)
        VALUES ('".addslashes($CommentValue)."', '$FK_Product','$FK_Customer')";

        // Execution de la requête
        $this->Query($sql);
      }
    }

    // Mise à jour du statut d'un commentaire
    public function UpdateCommentStatus(){
      // Vérifier que l'on reçoit bien des données à traiter
      if($this->jsonToProcess !=null)
      {
        // Récupération et assignation des données reçues
        $commentId = $this->jsonToProcess->id_Comment;
    	  $commentStatus = $this->jsonToProcess->isActive;

  			// Requête d'update
  			$updateCommentStatus = "UPDATE
  									t_comments
  								SET
  									t_comments.isActive = '$commentStatus'
  								WHERE
  									t_comments.id_Comment = '$commentId'";
                    
        // Execution de la requête
  			$this->Query($updateCommentStatus);
      }
  	}
}
