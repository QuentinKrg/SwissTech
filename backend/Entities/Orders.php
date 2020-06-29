<?php
/*
  Classe pour la gestion des commandes, elle hérite de la classe "Entity"
*/

class Orders extends Entity
{
    // Construction
    public function  __construct(){
      // Connexion à la db
  	   $this->Connect();
    }

    // Récupération des commandes d'un utilisateur avec son nom d'utilisateur
  	public function GetOrderByUsernameMBL() {
      // Tableau
  		$orders = [];

      // Vérifier que l'on reçoit bien le paramètre voulu
			if(isset($_GET['username'])){
        // Assignation des valeurs
				$currentUsername = $_GET['username'];
        // Requête
        $sql = "SELECT id_Order, tor.OrderDate, tst.StatusName,tpm.MethodName,
				(SELECT SUM(tpo.Quantity * tp.ProductUnitPrice) FROM
				t_products_orders tpo
				INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
				WHERE tpo.FK_Order = id_Order) TotalOrder
				FROM t_orders tor
				INNER JOIN t_paymentmethod tpm ON tpm.id_paymentmethod = tor.FK_PaymentMethod
				INNER JOIN t_status tst ON tst.id_Status = tor.FK_Status
				WHERE tor.FK_Customer = (SELECT fk_customer FROM t_users WHERE Username = '$currentUsername')
				ORDER BY id_order DESC";

        // Exécution de la requête + stockage du retour
			  $tmpResult =($this->Query($sql));

        // Vérifier que l'on reçoit au moins une ligne de données
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
			}
  	}

    // Récupération de la liste des produits dans une commande avec l'id de la commande
    public function getProductsFromOrderByOrderIDMBL() {
      // Tableau
      $orderDetails= [];
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['orderid'])){
        // Assignation des valeurs
        $currentID = $_GET['orderid'];
        // Requête
        $sql = "SELECT tp.id_Product, tp.ProductName, ti.ImagePath, tpo.Quantity, tpo.CourantUnitPrice,(tpo.Quantity * tpo.CourantUnitPrice) AS TotalPrice, tpo.FK_Order
        FROM t_products_orders tpo
        INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
        INNER JOIN t_orders tor ON tor.id_Order = tpo.FK_Order
        INNER JOIN t_products_images tpi ON tpi.FK_Product = tp.id_Product
        INNER JOIN t_images ti ON ti.id_Image = tpi.FK_Image
        WHERE tpo.FK_Order = '$currentID'";

        // Exécution de la requête + stockage du retour
        $tmpResult=($this->Query($sql));

        // Vérifier que l'on reçoit au moins une ligne de données
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
      }
    }

    // Récupération de l'adresse de livraison utilisée pour une commande avec l'id d'une commande
    public function getOrderShippingAddressByOrderIDMBL() {
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['orderid'])){
        // Assignation des valeurs
        $currentID = $_GET['orderid'];
        // Requête
        $sql = "SELECT * FROM t_orders
        INNER JOIN t_address ON t_address.id_Address = t_orders.FK_Order_ShippingAddress
        WHERE id_order = '$currentID'";
        // Exécution de la requête + stockage du retour
        $tmpResult=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour du résultat
        return $tmpResult;
      }
    }

    // Récupération de l'adresse de facturation utilisée pour une commande avec l'id d'une commande
    public function getOrderBillingAddressByOrderIDMBL() {
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['orderid'])){
        // Assignation des valeurs
        $currentID = $_GET['orderid'];
        // Requête
        $sql = "SELECT * FROM t_orders
        INNER JOIN t_address ON t_address.id_Address = t_orders.FK_Order_BillingAddress
        WHERE id_order = '$currentID'";
        // Exécution de la requête + stockage du retour
        $tmpResult=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
        // Requête
        return $tmpResult;
      }
    }

    // Création d'une nouvelle commande
    public function addOrderMBL() {
      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
        $id_client = $this->jsonToProcess->id_user;
        $paymentMethodCode = $this->jsonToProcess->paymentMethodCode;
        $shoppingCart[] = $this->jsonToProcess->shoppingCart;
        $FK_Order_ShippingAddress = $this->jsonToProcess->FK_Order_ShippingAddress;
        $FK_Order_BillingAddress = $this->jsonToProcess->FK_Order_BillingAddress;
        // Récupérer l'id customer du client
        $getFKCustomerByUserId = "SELECT t_users.FK_Customer FROM t_users WHERE t_users.id_user = '$id_client' LIMIT 1";
        $FK_Customer = ($this->Query($getFKCustomerByUserId)->fetchColumn());

        // Insérer un nouvel order avec les infos suivantes : méthode de paiment, FK_Customer
        $createNewOrder = "INSERT INTO t_orders (t_orders.FK_Customer, t_orders.FK_PaymentMethod,FK_Order_ShippingAddress, FK_Order_BillingAddress)
        VALUES ($FK_Customer,(SELECT t_paymentmethod.id_paymentmethod FROM t_paymentmethod WHERE t_paymentmethod.MethodCode = '$paymentMethodCode'),
        '$FK_Order_ShippingAddress', '$FK_Order_BillingAddress')";
        $this->Query($createNewOrder);

        // Récupérer l'id de la commande crée à l'instant
        $getOrderId ="SELECT t_orders.id_Order FROM t_orders WHERE t_orders.FK_Customer = '$FK_Customer'
        ORDER BY t_orders.OrderDate DESC LIMIT 1";
        $orderId = ($this->Query($getOrderId)->fetchColumn());

        // Insértion des produits de la commande
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

    // Ajout d'une carte de crédit
    public function addCreditCardMBL() {
      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
        $cardNumber = $this->jsonToProcess->cardNumber;
        $cardName = $this->jsonToProcess->cardName;
        $cardCode = $this->jsonToProcess->cardCode;
        $expirationMonthDate = $this->jsonToProcess->expirationMonthDate;
        $expirationYearDate = $this->jsonToProcess->expirationYearDate;
        $id_client = $this->jsonToProcess->id_client;

        // Récupérer l'id customer du client
        $getFKCustomerByUserId = "SELECT t_users.FK_Customer FROM t_users WHERE t_users.id_user = '$id_client' LIMIT 1";
        $FK_Customer = ($this->Query($getFKCustomerByUserId)->fetchColumn());

        // Récupérer l'id de la commande crée à l'instant
        $getOrderId ="SELECT t_orders.id_Order FROM t_orders WHERE t_orders.FK_Customer = '$FK_Customer'
        ORDER BY t_orders.OrderDate DESC LIMIT 1";
        $orderId = ($this->Query($getOrderId)->fetchColumn());

        // Date d'expiration
        $dateToAdd = $expirationYearDate."-".$expirationMonthDate."-1";

        // Insert dans la table "t_paymentcustomer" : CardNumber, CardName, CardCode, ExpirationdAte, FK_Customer, FK_Order
        $sql = "INSERT INTO t_paymentcustomer (t_paymentcustomer.CardNumber,t_paymentcustomer.CardName,t_paymentcustomer.CardCode,t_paymentcustomer.ExpiringDate,t_paymentcustomer.FK_Customer,t_paymentcustomer.FK_Order)
        VALUES ('$cardNumber', '$cardName', $cardCode, '$dateToAdd', $FK_Customer, $orderId)";
        // Exécution de la requête
        $this->Query($sql);
      }
    }

    // Récupération des toutes les commandes
    public function getAllOrdersMBAD() {
      // Tableau
      $orders = [];
      // Requête
      $sql = "SELECT id_Order, tor.OrderDate, tst.StatusName, tst.id_Status,tpm.MethodName,usr.Username,
      (SELECT SUM(tpo.Quantity * tp.ProductUnitPrice) FROM
      t_products_orders tpo
      INNER JOIN t_products tp ON tp.id_Product = tpo.FK_Product
      WHERE tpo.FK_Order = id_Order) TotalOrder
      FROM t_orders tor
      INNER JOIN t_paymentmethod tpm ON tpm.id_paymentmethod = tor.FK_PaymentMethod
      INNER JOIN t_status tst ON tst.id_Status = tor.FK_Status
      INNER JOIN t_users usr ON tor.FK_Customer = usr.FK_Customer
      ORDER BY id_order DESC";

      // Exécution de la requête + stockage du retour
      $tmpResult =($this->Query($sql));

      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $orders[$cr]['id_Order'] = $row['id_Order'];
          $orders[$cr]['OrderDate'] = $row['OrderDate'];
          $orders[$cr]['StatusName'] = $row['StatusName'];
          $orders[$cr]['TotalOrder'] = $row ['TotalOrder'];
          $orders[$cr]['MethodName'] = $row ['MethodName'];
          $orders[$cr]['Username'] = $row ['Username'];
          $orders[$cr]['StatusId'] = $row ['id_Status'];

          $cr++;
        }
        // echo de la liste des articles
        return $orders;
      }
    }

    // Récupération des tous les status des commandes
    public function getAllStatusMBL() {
      // Tableau
      $status = [];
      // Requête
      $sql = "SELECT * FROM t_status";
      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);
      // Vérifier que l'on reçoit au moins une ligne de données
      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $articles[$cr]['id'] = $row['id_Status'];
          $articles[$cr]['StatusName'] = $row['StatusName'];
          $cr++;
        }
        // echo de la liste des articles
        return $articles;
      }
    }

    // Mise à jour d'une commande
    public function updateOrderMBAD() {
      // Vérifier que l'on reçoit bien les données voulues
      if($this->jsonToProcess !=null)
      {
        // Assignation des valeurs
        $id_order = $this->jsonToProcess->id_Order;
        $statusId = $this->jsonToProcess->StatusId;

        // Requête
        $sql ="UPDATE t_orders
        SET t_orders.FK_Status = '$statusId'
        WHERE t_orders.id_Order = '$id_order'";

        // Exécution de la requête
        $this->Query($sql);
      }
    }

}
 ?>
