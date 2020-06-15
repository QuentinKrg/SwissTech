<?php
/**
 * User: Winston Meisen
 * Date: 02.03.2020
 * Time: 12:00
 */

class Statistics extends Entity
{
    public function  __construct(){
		$this->Connect();
    }
//CLIENTS

	// Récupération du nombre de clients actuel
		public function GetNumberOfCustomers(){
		  $sql = " SELECT COUNT(id_customer) AS NumberOfCustomers FROM t_customers";

		   $tmpResult = ($this->Query($sql)->fetchColumn());
		   // Retour du résultat
		   return $tmpResult;
		}
	// Récupération du dernier client inscrit
		public function GetLastCustomerRegistered(){
		  $sql = "SELECT * FROM t_customers ORDER BY  CustomerSince DESC LIMIT 1";

		   $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

		   // Retour du résultat
		   return $tmpResult;
    }
//Comentaires
	// Récupération du nombre de commentaires
		public function GetNumberOfComments(){
		  $sql = " SELECT COUNT(id_comment) AS NumberOfComments FROM t_comments";

		   $tmpResult = ($this->Query($sql)->fetchColumn());

		   // Retour du résultat
		   return $tmpResult;
		}
	// Récupération du dernier commentaire
		public function GetLastCommentAdded(){
		  $sql = "SELECT * FROM t_comments
					INNER JOIN t_customers ON t_customers.id_customer = t_comments.FK_Customer
					 ORDER BY  CommentDate DESC LIMIT 1";

		   $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

		   // Retour du résultat
		   return $tmpResult;
    }
//Articles
	// BestSeller
		public function GetBestSellerProduct(){
		  $sql = "SELECT ProductName, FK_Product, sum(Quantity)
					  FROM t_products_orders
						 INNER JOIN t_products ON t_products.id_Product = t_products_orders.FK_Product
						 GROUP by FK_Product ORDER BY sum(Quantity) DESC";


		   $tmpResult = ($this->Query($sql)->fetchColumn(0));

		   // Retour du résultat
		   return $tmpResult;
		}
}

 ?>
