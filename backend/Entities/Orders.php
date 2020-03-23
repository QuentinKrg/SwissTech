<?php
/**
 * User: Winston Meisen
 * Date: 23.03.2020
 * Time: 12:45
 */

class Customer extends Entity
{

    public function  __construct(){
		$this->Connect();
    }

	public function GetOrderByUsername(){
			if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				  $sql = "SELECT id_Order, tor.OrderDate, tst.StatusName
								FROM t_orders tor
								INNER JOIN t_status tst ON tst.id_Status = tor.FK_Status
								WHERE tor.FK_Customer = (SELECT fk_customer FROM t_users WHERE Username = '$currentUsername')"
				  $getCustomer =($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
				return $getCustomer;
			}
		}
	public function getProductsFromOrderByUser(){
		if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				   $sql = "SELECT tp.ProductName, tpo.Quantity, tp.ProductUnitPrice,(tpo.Quantity * tp.ProductUnitPrice) AS TotalPrice 
								FROM t_products_orders tpo
								INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
								INNER JOIN t_orders tor ON tor.id_Order = tpo.FK_Order
								WHERE tpo.FK_Order = tor.id_Order
								AND tor.FK_Customer = (SELECT fk_customer FROM t_users WHERE Username = '$currentUsername')";
				  $getShipAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
				return $getShipAddr;
		}
	}
	
}
 ?>