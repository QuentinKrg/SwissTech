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
    public function AddCustomer(){
		
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
	
	// Ajout d'un Client via le formulaire d'inscription
    public function UpdateCustomer(){
		
		if(isset($_GET['username'])){
				$currentUsername = $_GET['username'];
				  
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
						// Hash du mot de passe reçu et du salt de l'utilisateur
						  $hashedPassword = hash('sha256', 'monsalt'.$password);
						// Requête sql pour la table customers
						//Insert
						$updatecustomerAndUser = "UPDATE 
												t_customers,
												t_users
											SET 
												t_customers.CustomerTitre = '$titre',
												t_customers.CustomerName = '$name',
												t_customers.CustomerLastName = '$lastname',
												t_customers.CustomerPhone = '$phone',
												t_customers.CustomerEmail= '$email',
												t_customers.CustomerBirthday = '$birthday',
												t_users.Username = '$login',
												t_users.Password = '$hashedPassword'
																	WHERE t_users.FK_Customer = t_customers.id_customer
																	AND t_users.username = '$currentUsername'
																	";
						$this->Query($updatecustomerAndUser);
						
						//UPDATE Shipping address
						$updateShippingAddress = "UPDATE 
													t_address
												SET 
													t_address.Address = '$shippingAddress',
													t_address.City = '$city',
													t_address.ZIP = '$zip'
																		WHERE t_address.FK_Customer = (SELECT FK_Customer FROM t_users WHERE Username ='$currentUsername' )
																		AND FK_AddressType = 1";
						$this->Query($updateShippingAddress);
						
						//UPDATE Billing Address
						$updateBillingAddress = "UPDATE 
													t_address
												SET 
													t_address.Address = '$billingAddress',
													t_address.City = '$billingAddressCity',
													t_address.ZIP = '$billingAddressZip'
																		WHERE t_address.FK_Customer = (SELECT FK_Customer FROM t_users WHERE Username ='$currentUsername' )
																		AND FK_AddressType = 2";
						$this->Query($updateBillingAddress);
					  }
			}
      
		
    }

	public function CheckPassword(){
		if(isset($_GET['username']) && isset($_GET['password'])){
			$currentUsername = $_GET['username'];
			$password= $_GET['password'];
			$hashedPassword = hash('sha256', 'monsalt'.$password);
			
			$sql = "SELECT Password FROM t_users WHERE Username = '$currentUsername' AND Password = '$hashedPassword'";
			$tmpPassword = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
			
			if($tmpPassword == 'false'){
				return http_response_code(409);
			}else{
				return $tmpPassword;
			}
				
			
		}
	  }

	public function CheckUserByUsername(){
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
	
	public function GetCustomerByUsername(){
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