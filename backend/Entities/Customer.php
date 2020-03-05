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
		$titre = $this->jsonToProcess->titre;
        $name = $this->jsonToProcess->firstname;
        $lastname = $this->jsonToProcess->lastname;
		$phone = $this->jsonToProcess->privatephone;
        $email = $this->jsonToProcess->email;
		$birthday = $this->jsonToProcess->birthday;
		$username = $this->jsonToProcess->username;
		$password = $this->jsonToProcess->password;
		$shippingAddress = $this->jsonToProcess->shippingAddress;
		$city = $this->jsonToProcess->shippingCity;
		$zip = $this->jsonToProcess->shippingZip;
		
		if(isset($this->jsonToProcess->billingAddress)){//si la checkbox same address est utilisée, on ne reçoit pas de données de billing address
		$billingAddress = $this->jsonToProcess->billingAddress; // donc si on reçoit les données, on les traitent, sinon on continue.
		$billingAddressCity = $this->jsonToProcess->billingAddressCity;
		$billingAddressZip = $this->jsonToProcess->billingAddressZip;
		} 
		$sameAddress = $this->jsonToProcess->checkbox_address;
		
		if($sameAddress){//si same address active, on utilise donc les mêmes données de shipping address
			$billingAddress = $shippingAddress;
			$billingAddressCity = $city;
			$billingAddressZip = $zip;
		}
		
		// Requête sql pour la table customers
		//Insert
        $addcustomer = "INSERT INTO t_customers
						(CustomerTitre,CustomerName , CustomerLastName , CustomerPhone , CustomerEmail , CustomerBirthday)
						VALUES ( '$titre','$name','$lastname','$phone','$email','$birthday')";
        $this->Query($addcustomer);
		
		
		//hashage du mdp
		$hashedPassword = hash('sha256', $password);
		// Création du token
		$token = md5(bin2hex(random_bytes(10)));

		//Génération de la validité du token
		$validity = new DateTime();
		$validity->Add(new DateInterval('PT1M'));
		$tokenValidity = $validity->format('yy-m-d H:i:s');
        //Requête sql pour la table users
		//Insert
		$adduser = "INSERT INTO t_users
					(Username , Password , salt , Token , TokenValidity)
					VALUES ('$username','$hashedPassword','monsalt','$token','$tokenValidity')";
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
}
 ?>