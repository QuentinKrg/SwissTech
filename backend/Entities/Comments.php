<?php
/**
 * User: Quentin Krenger
 * Date: 27.03.2020
 * Time: 13:39
 */

class Comments extends Entity
{

    public function  __construct()
    {

    }

    // Récupération de tous les commentaires d'un article avec son ID
    public function getAllProductsComments()
    {
      $comments = [];

      $sql = "SELECT * FROM t_comments
              INNER JOIN t_customers ON t_comments.FK_Customer = t_customers.id_customer
              WHERE t_comments.FK_Product = $this->idToProcess ORDER BY t_comments.CommentDate DESC";

      $tmpResult = $this->Query($sql);

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

     //return $tmpResult;

    }

    // Ajout d'un commentaire
    public function addComment()
    {
      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
        $CommentValue = htmlspecialchars($this->jsonToProcess->CommentValue);

        $FK_Product = $this->jsonToProcess->FK_Product;
        $FK_Customer = $this->jsonToProcess->FK_Customer;

        $sql = "INSERT INTO t_comments (CommentValue, FK_Product, FK_Customer)
        VALUES ('$CommentValue', '$FK_Product','$FK_Customer')";
        $this->Query($sql);
      }
    }

    // Mise à jour du statut d'un commentaire
    public function UpdateCommentStatus(){
      if($this->jsonToProcess !=null)
      {
        $commentId = $this->jsonToProcess->id_Comment;
    	  $commentStatus = $this->jsonToProcess->isActive;


  			//Update
  			$updateCommentStatus = "UPDATE
  									t_comments
  								SET
  									t_comments.isActive = '$commentStatus'
  								WHERE
  									t_comments.id_Comment = '$commentId'";
  			$this->Query($updateCommentStatus);
      }
  	}
}
