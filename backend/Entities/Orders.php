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

	public function GetOrderByUsername() {
		$orders = [];
			if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				  $sql = "SELECT id_Order, tor.OrderDate, tst.StatusName,
								(SELECT SUM(tpo.Quantity * tp.ProductUnitPrice) FROM
								t_products_orders tpo
								INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
								WHERE tpo.FK_Order = id_Order) TotalOrder
									FROM t_orders tor
									INNER JOIN t_paymentmethod tpm ON tpm.id_paymentmethod = tor.FK_PaymentMethod
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
						  $orders[$cr]['TotalOrder'] = $row ['TotalOrder'];
						  $orders[$cr]['MethodName'] = $row ['MethodName'];
						  $cr++;
						}
						// echo de la liste des articles
						return $orders;
					}

				return $tmpResult;
			}
	}


	public function getProductsFromOrderByOrderID() {
		$orderDetails= [];

		if(isset($_GET['orderid'])){
				$currentID = $_GET['orderid'];
				   $sql = "SELECT tp.id_Product, tp.ProductName, ti.ImagePath, tpo.Quantity, tpo.CourantUnitPrice,(tpo.Quantity * tpo.CourantUnitPrice) AS TotalPrice, tpo.FK_Order
								FROM t_products_orders tpo
								INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
								INNER JOIN t_orders tor ON tor.id_Order = tpo.FK_Order
								INNER JOIN t_products_images tpi ON tpi.FK_Product = tp.id_Product
								INNER JOIN t_images ti ON ti.id_Image = tpi.FK_Image
								WHERE tpo.FK_Order = '$currentID'";

				  $tmpResult=($this->Query($sql));

				  if($tmpResult->rowCount() > 0) {

						// Sortir les données pour chaque "row"
						$cr = 0;
						while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
							$orderDetails[$cr]['id_Product'] = $row['id_Product'];
						  $orderDetails[$cr]['ProductName'] = $row['ProductName'];
						  $orderDetails[$cr]['ImagePath'] = $row['ImagePath'];
						  $orderDetails[$cr]['Quantity'] = $row['Quantity'];
						  $orderDetails[$cr]['CourantUnitPrice'] = $row['CourantUnitPrice'];
						  $orderDetails[$cr]['TotalPrice'] = $row['TotalPrice'];
						  $orderDetails[$cr]['FK_Order'] = $row['FK_Order'];
						  $cr++;
						}
						// echo de la liste des articles
						return $orderDetails;
					}

				return $tmpResult;
		}
	}

  // Création d'une nouvelle commande
  public function addOrder() {
    if($this->jsonToProcess !=null)
    {
      // Récupération des données reçues
      $id_client = $this->jsonToProcess->id_user;
      $paymentMethodCode = $this->jsonToProcess->paymentMethodCode;
      $shoppingCart[] = $this->jsonToProcess->shoppingCart;

      // Récupérer l'id customer du client
      $getFKCustomerByUserId = "SELECT t_users.FK_Customer FROM t_users WHERE t_users.id_user = '$id_client' LIMIT 1";
      $FK_Customer = ($this->Query($getFKCustomerByUserId)->fetchColumn());

      // Insérer un nouvel order avec les infos suivantes : méthode de paiment, FK_Customer
      $createNewOrder = "INSERT INTO t_orders (t_orders.FK_Customer, t_orders.FK_PaymentMethod)
              VALUES ($FK_Customer,(SELECT t_paymentmethod.id_paymentmethod FROM t_paymentmethod WHERE t_paymentmethod.MethodCode = '$paymentMethodCode'))";
      $this->Query($createNewOrder);

      // Récupérer l'id de la commande crée à l'instant
      $getOrderId ="SELECT t_orders.id_Order FROM t_orders WHERE t_orders.FK_Customer = '$FK_Customer'
                    ORDER BY t_orders.OrderDate DESC LIMIT 1";
      $orderId = ($this->Query($getOrderId)->fetchColumn());

      // Insértion des prorduits de la commande
      foreach ($shoppingCart as $product) {
        foreach ($product as $details) {
          $id_product = $details->id_Product;
          $quantity = $details->Quantity;

          // Insert dans la table "t_products_orders" : quantité, currentUnitPrice, id_Product, id_Order
          $sql = "INSERT INTO t_products_orders (t_products_orders.Quantity, t_products_orders.CourantUnitPrice, t_products_orders.FK_Product, t_products_orders.FK_Order)
                  VALUES ($quantity, (SELECT t_products.ProductUnitPrice FROM t_products WHERE t_products.id_Product = $id_product),$id_product,$orderId)";
          $this->Query($sql);
        }
      }
    }
  }

}
 ?>
