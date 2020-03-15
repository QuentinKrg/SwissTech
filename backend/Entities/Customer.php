<?php
/**
 * User: Quentin Krenger
 * Date: 21.01.2020
 * Time: 12:44
 */

class Customer extends Entity
{

    public function  __construct()
    {
		$this->Connect();
    }


    // Ajout d'un Client via le formulaire d'inscription
    public function AddCustomer()
    {
		
      if($this->jsonToProcess !=null)
      {
		
        // Récupération des données reçues
		$titre = $this->jsonToProcess->CustomerTitre;
        $name = $this->jsonToProcess->CustomerName;
        $lastname = $this->jsonToProcess->CustomerLastName;
		$phone = $this->jsonToProcess->CustomerPhone;
        $email = $this->jsonToProcess->CustomerEmail;
		$birthday = $this->jsonToProcess->CustomerBirthday;
		$login = $this->jsonToProcess->username;
		$password = $this->jsonToProcess->password;
		$shippingAddress = $this->jsonToProcess->shippingAddress;
		$city = $this->jsonToProcess->shippingCity;
		$zip = $this->jsonToProcess->shippingZip;
		
		if(isset($this->jsonToProcess->billingAddress)){//si la checkbox same address est utilisée, on ne reçoit pas de données de billing address
		$billingAddress = $this->jsonToProcess->billingAddress; // donc si on reçoit les données, on les traitent, sinon on continue.
		$billingAddressCity = $this->jsonToProcess->billingCity;
		$billingAddressZip = $this->jsonToProcess->billingAddressZip;
		} 
		$sameAddress = $this->jsonToProcess->checkbox_address;
		
		if($sameAddress){//si same address active, on utilise donc les mêmes données de shipping address
			$billingAddress = $shippingAddress;
			$billingAddressCity = $city;
			$billingAddressZip = $zip;
		}
		
		$sql = "SELECT * FROM t_users WHERE Username = '$login'";
		$tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
		
		if($tmpUser != null)
		  {
			return http_response_code(409);
		  }
		// Requête sql pour la table customers
		//Insert
        $addcustomer = "INSERT INTO t_customers
						(CustomerTitre,CustomerName , CustomerLastName , CustomerPhone , CustomerEmail , CustomerBirthday)
						VALUES ( '$titre','$name','$lastname','$phone','$email','$birthday')";
        $this->Query($addcustomer);
		
		

		  // Hash du mot de passe reçu et du salt de l'utilisateur
		  $hashedPassword = hash('sha256', 'monsalt'.$password);
		  
		// Création du token
		$token = md5(bin2hex(random_bytes(10)));

		//Génération de la validité du token
		$validity = new DateTime();
		$validity->Add(new DateInterval('PT1M'));
		$tokenValidity = $validity->format('yy-m-d H:i:s');
		
        //Requête sql pour la table users
		//Insert
		$adduser = "INSERT INTO t_users
					(Username , Password , salt , Token , TokenValidity,FK_Customer)
					VALUES ('$login','$hashedPassword','monsalt','$token','$tokenValidity',
					(SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname' AND CustomerBirthday ='$birthday'))";
        $this->Query($adduser);
		
		//Insert Shipping address
		$addShippingAddress = "INSERT INTO t_address 
							  (Address , City , Zip , FK_AddressType , FK_Customer)
							  VALUES ('$shippingAddress','$city','$zip','1',
							  (SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname'))";
        $this->Query($addShippingAddress);
		//Insert Billing Address
		$addBillingAddress = "INSERT INTO t_address
							(Address , City , Zip , FK_AddressType , FK_Customer)
							VALUES ('$billingAddress','$billingAddressCity','$billingAddressZip','2',
							(SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname'))";
        $this->Query($addBillingAddress);
	  }
		
    }
	public function CheckUserByUsername()
	  {
		$username = $this->jsonToProcess->username;
		$sql = "SELECT * FROM t_users WHERE Username = '$username'";
		$tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
		
		if($tmpUser != null)
		  {
			return http_response_code(409);
		  }
		else {
			return $tmpUser;
		}
	  }
	public function GetCustomerByUsername()
		{
			if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				  $sql = "SELECT * FROM t_users	
					   INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
					   WHERE Username = '$currentUsername' LIMIT 1";
				  $getCustomer =($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
				return $getCustomer;
			}
		}
		
	public function getShippingAddressByUser(){
		if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				   $sql = "SELECT Address as 'shippingAddress',City AS 'shippingCity', Zip AS 'shippingZip' , FK_AddressType, FK_Customer
							FROM t_address 
							WHERE FK_AddressType = 1 AND FK_Customer = (SELECT id_customer FROM t_users	
							    INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
								WHERE Username = '$currentUsername' LIMIT 1) LIMIT 1";
				  $getShipAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
				return $getShipAddr;
		}
	}
	
	public function getBillingAddressByUser(){
		if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				   $sql = "SELECT Address as 'billingAddress',City AS 'billingCity', Zip AS 'billingZip' , FK_AddressType, FK_Customer
							FROM t_address 
							WHERE FK_AddressType = 2 AND FK_Customer = (SELECT id_customer FROM t_users	
							    INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
								WHERE Username = '$currentUsername' LIMIT 1) LIMIT 1";
				  $getBillAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));
				return $getBillAddr;
		}
	}
}
 ?>