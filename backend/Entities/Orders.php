<?php
/**
 * User: Winston Meisen
 * Date: 23.03.2020
 * Time: 12:45
 */

class Orders extends Entity
{

    public function  __construct(){
		$this->Connect();
    }

	public function GetOrderByUsername(){
		$orders = [];
			if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				  $sql = "SELECT id_Order, tor.OrderDate, tst.StatusName
								FROM t_orders tor
								INNER JOIN t_status tst ON tst.id_Status = tor.FK_Status
								WHERE tor.FK_Customer = (SELECT fk_customer FROM t_users WHERE Username = '$currentUsername')";
				  $tmpResult =($this->Query($sql));
				  
				  if($tmpResult->rowCount() > 0) {

						// Sortir les données pour chaque "row"
						$cr = 0;
						while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
						  $orders[$cr]['id_Order'] = $row['id_Order'];
						  $orders[$cr]['OrderDate'] = $row['OrderDate'];
						  $orders[$cr]['StatusName'] = $row['StatusName'];
						  $cr++;
						}
						// echo de la liste des articles
						return $orders;
					}
				  
				return $tmpResult;
			}
		}
	public function getProductsFromOrderByUser(){
		$orderDetails= [];
		
		if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				   $sql = "SELECT tp.ProductName, tpo.Quantity, tp.ProductUnitPrice,(tpo.Quantity * tp.ProductUnitPrice) AS TotalPrice 
								FROM t_products_orders tpo
								INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
								INNER JOIN t_orders tor ON tor.id_Order = tpo.FK_Order
								WHERE tpo.FK_Order = tor.id_Order
								AND tor.FK_Customer = (SELECT fk_customer FROM t_users WHERE Username = '$currentUsername')";
								
				  $tmpResult=($this->Query($sql));
				  
				  if($tmpResult->rowCount() > 0) {

						// Sortir les données pour chaque "row"
						$cr = 0;
						while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
						  $orderDetails[$cr]['ProductName'] = $row['ProductName'];
						  $orderDetails[$cr]['Quantity'] = $row['Quantity'];
						  $orderDetails[$cr]['ProductUnitPrice'] = $row['ProductUnitPrice'];
						  $orderDetails[$cr]['TotalPrice'] = $row['TotalPrice'];
						  $cr++;
						}
						// echo de la liste des articles
						return $orderDetails;
					}
				  
				return $tmpResult;
		}
	}
	
}
 ?>