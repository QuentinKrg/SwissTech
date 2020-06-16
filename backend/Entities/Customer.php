<?php
/*
  Classe pour la gestion des clients, elle hérite de la classe "Entity"
*/

class Customer extends Entity
{
    // Construction
    public function  __construct(){
        // Connexion à la bdd
		    $this->Connect();
    }

    // Ajout d'un Client via le formulaire d'inscription
    public function AddCustomer(){
  		// Valeur du Salt
  		$salt = "i;151-120#";
      if($this->jsonToProcess !=null)
      {
        // Récupération des données reçues
    		$titre = $this->jsonToProcess->CustomerTitle;
    		$fullName = $this->jsonToProcess->FullName;
        $name = $this->jsonToProcess->CustomerName;
        $lastname = $this->jsonToProcess->CustomerLastName;
    		$phone = $this->jsonToProcess->CustomerPhone;
        $email = $this->jsonToProcess->CustomerEmail;
    		$birthday = $this->jsonToProcess->CustomerBirthday;
    		$login = $this->jsonToProcess->Username;
    		$password = $this->jsonToProcess->password;
    		$shippingAddress = $this->jsonToProcess->shippingAddress;
    		$city = $this->jsonToProcess->shippingCity;
    		$zip = $this->jsonToProcess->shippingZip;

    		if(isset($this->jsonToProcess->billingAddress)){//si la checkbox same address est utilisée, on ne reçoit pas de données de billing address
      		$billingAddress = $this->jsonToProcess->billingAddress; // donc si on reçoit les données, on les traitent, sinon on continue.
      		$billingAddressCity = $this->jsonToProcess->billingCity;
      		$billingAddressZip = $this->jsonToProcess->billingZip;
    		}
    		$sameAddress = $this->jsonToProcess->checkbox_address;

    		if($sameAddress){//si same address active, on utilise donc les mêmes données de shipping address
    			$billingAddress = $shippingAddress;
    			$billingAddressCity = $city;
    			$billingAddressZip = $zip;
    		}

        // Requête pour récupérer toutes les données par rapport à un "login"
    		$sql = "SELECT * FROM t_users WHERE Username = '$login'";
    		$tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);

        // Vérifier que l'on reçoit bien qqch sinon code d'erreure
        if($tmpUser != null)
        {
          return http_response_code(409);
        }

    		// Requête sql pour la table customers
    		//Insert
        $addcustomer = "INSERT INTO t_customers
    				(FK_Title,CustomerName , CustomerLastName , CustomerPhone , CustomerEmail , CustomerBirthday)
    				VALUES ( '$titre','$name','$lastname','$phone','$email','$birthday')";

        // Execution de la requête
        $this->Query($addcustomer);

    	  // Hash du mot de passe reçu et du salt de l'utilisateur
    	  $hashedPassword = hash('sha256', $salt.$password);

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
    					VALUES ('$login','$hashedPassword','$salt','$token','$tokenValidity',
    					(SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname' AND CustomerBirthday ='$birthday'))";

        // Execution de la requête
        $this->Query($adduser);

    		//Insert Shipping address
    		$addShippingAddress = "INSERT INTO t_address
    							  (Address , City , Zip , FK_AddressType , FK_Customer,FK_Title,FullName,isDefault)
    							  VALUES ('$shippingAddress','$city','$zip','1',
    							  (SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname'),'$titre','$fullName',1)";

        // Execution de la requête
        $this->Query($addShippingAddress);

    		//Insert Billing Address
    		$addBillingAddress = "INSERT INTO t_address
    							(Address , City , Zip , FK_AddressType , FK_Customer,FK_Title, FullName, isDefault)
    							VALUES ('$billingAddress','$billingAddressCity','$billingAddressZip','2',
    							(SELECT id_customer FROM t_customers WHERE CustomerName = '$name' AND CustomerLastName = '$lastname'),'$titre','$fullName',1)";

        // Execution de la requête
        $this->Query($addBillingAddress);
  	  }
    }

    // Ajout d'un Client via le formulaire d'inscription
    public function UpdateCustomer(){
      // Valeur du Salt
      $salt = "i;151-120#";

      // Vérifier que l'on reçoit bien un nom d'utilisateur en paramètre
      if(isset($_GET['username'])){
        // assignation de la donnée
        $currentUsername = $_GET['username'];

        // Vérifier que l'on reçoit bien des données à traiter
        if($this->jsonToProcess !=null){
          // Vréfier si on reçoit le nom du client
          if(isset($this->jsonToProcess->CustomerName)){
            // Récupération des données reçues
            $titre = $this->jsonToProcess->FK_Title;
            $name = $this->jsonToProcess->CustomerName;
            $lastname = $this->jsonToProcess->CustomerLastName;
            $phone = $this->jsonToProcess->CustomerPhone;
            $email = $this->jsonToProcess->CustomerEmail;
            $birthday = $this->jsonToProcess->CustomerBirthday;
          }

          // Vérifier si on l'adresse de livraison
          if(isset($this->jsonToProcess->shippingAddress)){
            $fullName = $this->jsonToProcess->FullName;
            $titre = $this->jsonToProcess->CustomerTitle;
            $shippingAddress = $this->jsonToProcess->shippingAddress;
            $city = $this->jsonToProcess->shippingCity;
            $zip = $this->jsonToProcess->shippingZip;
            $id = $this->jsonToProcess->shippingID;

            // Requête
            $updateShippingAddress = "UPDATE
            t_address
            SET
            T_address.FK_Title ='$titre',
            t_address.FullName ='$fullName',
            t_address.Address = '$shippingAddress',
            t_address.City = '$city',
            t_address.ZIP = '$zip'
            WHERE t_address.id_Address = '$id'";

            // Execution de la requête
            $this->Query($updateShippingAddress);
          }

          if(isset($this->jsonToProcess->billingAddress)){//si la checkbox same address est utilisée, on ne reçoit pas de données de billing address

            $fullName = $this->jsonToProcess->FullName;
            $titre = $this->jsonToProcess->CustomerTitle;
            $billingAddress = $this->jsonToProcess->billingAddress; // donc si on reçoit les données, on les traitent, sinon on continue.
            $billingAddressCity = $this->jsonToProcess->billingCity;
            $billingAddressZip = $this->jsonToProcess->billingZip;
            $id = $this->jsonToProcess->billingID;

            //UPDATE Billing Address
            $updateBillingAddress = "UPDATE
            t_address
            SET
            T_address.FK_Title ='$titre',
            T_address.FullName ='$fullName',
            t_address.Address = '$billingAddress',
            t_address.City = '$billingAddressCity',
            t_address.ZIP = '$billingAddressZip'
            WHERE t_address.id_Address = '$id'";

            // Execution de la requête
            $this->Query($updateBillingAddress);
          }

          // Vérifier si le nom d'utilisateur est "set"
          if(isset($this->jsonToProcess->Username)){
            $login = $this->jsonToProcess->Username;

            // Requête
            $updateUser = "UPDATE
            t_users
            SET
            t_users.Username = '$login'
            WHERE
            t_users.username = '$currentUsername'";

            // Execution de la requête
            $this->Query($updateUser);
          }
        }

        // Vérifier si un nouveau mot de passe est "set"
        if(isset($this->jsonToProcess->password)){
          $password = $this->jsonToProcess->password;
          // Hash du mot de passe reçu et du salt de l'utilisateur
          $hashedPassword = hash('sha256', $salt.$password);
          //Update
          $updatePassword = "UPDATE
          t_users
          SET
          t_users.Password = '$hashedPassword'
          WHERE
          t_users.username = '$currentUsername'";

          // Execution de la requête
          $this->Query($updatePassword);
        }

        // Vérifier si l'on reçoit un nom de client
        if(isset($this->jsonToProcess->CustomerName)){

          // Requête sql pour la table customers
          //Update
          $updatecustomerAndUser = "UPDATE
          t_customers,
          t_users
          SET
          t_customers.FK_Title = '$titre',
          t_customers.CustomerName = '$name',
          t_customers.CustomerLastName = '$lastname',
          t_customers.CustomerPhone = '$phone',
          t_customers.CustomerEmail= '$email',
          t_customers.CustomerBirthday = '$birthday'
          WHERE t_users.FK_Customer = t_customers.id_customer
          AND t_users.username = '$currentUsername'";

          // Execution de la requête
          $this->Query($updatecustomerAndUser);
        }
      }
    }

    // Vérifier le mot de passe
    public function CheckPassword(){
      // Valeur du Salt
      $salt = "i;151-120#";

      // Assignation des données reçues
      $login = $this->jsonToProcess->username;
      $password = $this->jsonToProcess->password;
      $hashedPassword = hash('sha256',$salt.$password);

      // Requête
      $sql = "SELECT Password FROM t_users WHERE Username = '$login' AND Password = '$hashedPassword'";

      // Execution de la requête + stockage du retour
      $tmpPassword = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);

      // Si la requête s'est mal executée -> code d'erreure
      if(!$tmpPassword){
        return http_response_code(409);
      }
      else{
        return $tmpPassword;
      }
    }

    // Vérifier un utilisateur grâce à son nom d'utilisateur
    public function CheckUserByUsername(){
      // Assigner les données reçues
      $username = $this->jsonToProcess->username;

      // Requête
      $sql = "SELECT * FROM t_users WHERE Username = '$username'";

      // Exécution de la requête + stockage du retour
      $tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);

      // Si la requête c'est mal déroulée => code erreure
      if($tmpUser != null)
      {
        return http_response_code(409);
      }
      else {
        // Sinon retourne les informations du user
        return $tmpUser;
      }
    }

    // Récupération des détails d'un article avec son ID
    public function GetCustomerById(){

      // Requête
      $sql = " SELECT * FROM t_customers
      INNER JOIN t_users ON t_users.fk_customer = t_customers.id_customer
      WHERE id_customer = $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    // Récupération de tous les clients
    public function GetAllCustomers(){
      // Tableau
      $customers = [];

      // Requête
      $sql = " SELECT * FROM t_customers
      INNER JOIN t_users ON t_users.fk_customer = t_customers.id_customer";

      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($sql);

      // Vérifier que l'on reçoit au moins 1 ligne de données en retour
      if($tmpResult->rowCount() > 0) {

        // Sortir les données pour chaque "row"
        $cr = 0;
        while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
          $customers[$cr]['id_customer'] = $row['id_customer'];
          $customers[$cr]['id_user'] = $row['id_user'];
          $customers[$cr]['FK_Title'] = $row['FK_Title'];
          $customers[$cr]['CustomerName'] = $row['CustomerName'];
          $customers[$cr]['CustomerLastName'] = $row['CustomerLastName'];
          $customers[$cr]['Username'] = $row['Username'];
          $customers[$cr]['CustomerPhone'] = $row['CustomerPhone'];
          $customers[$cr]['CustomerEmail'] = $row['CustomerEmail'];
          $customers[$cr]['CustomerBirthday'] = $row['CustomerBirthday'];
          $customers[$cr]['isActive'] = $row['isActive'];
          $customers[$cr]['FK_Role'] = $row['FK_Role'];
          $customers[$cr]['IpAddress'] = $row['IpAddress'];
          $customers[$cr]['CustomerSince'] = $row['CustomerSince'];
          $cr++;
        }
        // echo de la liste des customers
        return $customers;
      }
    }

    // Récupérer les informations du client avec son nom d'utilisateur
    public function GetCustomerByUsername(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $currentUsername = $_GET['username'];

        // Requête
        $sql = "SELECT * FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        INNER JOIN t_titles ON t_titles.id_CustomerTitle = t_customers.FK_Title
        WHERE Username = '$currentUsername' LIMIT 1";

        // Execution de la requête + stockage du retour
        $getCustomer =($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour des informations client
        return $getCustomer;
      }
    }

    // Récupération des de l'adresse de livraison d'un utilisateur avec son nom d'utilisateur
    public function getShippingAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $currentUsername = $_GET['username'];

        // Requête
        $sql = "SELECT t_address.Address as 'shippingAddress',FK_Title,t_address.FullName, t_address.City AS 'shippingCity', t_address.Zip AS 'shippingZip' , t_address.FK_AddressType, t_address.FK_Customer
        FROM t_address
        WHERE FK_AddressType = 1 AND FK_Customer = (SELECT id_customer FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        WHERE Username = '$currentUsername' LIMIT 1) AND isDefault=1 LIMIT 1";

        // Exécution de la requête + stockage du retour
        $getShipAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour des informations de l'adresse de livraison
        return $getShipAddr;
      }
    }

    // Récupération des de l'adresse de facturation d'un utilisateur avec son nom d'utilisateur
    public function getBillingAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Tableau
        $billingAddress = [];
        // Assignation des valeurs
        $currentUsername = $_GET['username'];
        // Requête
        $sql = "SELECT FK_Title, t_address.FullName, Address as 'billingAddress',City AS 'billingCity', Zip AS 'billingZip' , FK_AddressType, FK_Customer
        FROM t_address
        WHERE FK_AddressType = 2 AND FK_Customer = (SELECT id_customer FROM t_users
          INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
          WHERE Username = '$currentUsername' LIMIT 1) AND isDefault=1 LIMIT 1";
        // Exécution de la requête + stockage du retour
        $getBillAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour des informations de l'adresse de facturation
        return $getBillAddr;
      }
    }

    // Récupération de la dernière adresse de livraison d'un utilisateur avec son nom d'utilisateur
    public function getLastShippingAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $currentUsername = $_GET['username'];

        // Requête
        $sql = "SELECT id_Address, t_address.Address as 'shippingAddress',FK_Title,t_address.FullName, t_address.City AS 'shippingCity', t_address.Zip AS 'shippingZip' , t_address.FK_AddressType, t_address.FK_Customer
        FROM t_address
        WHERE FK_AddressType = 1 AND FK_Customer = (SELECT id_customer FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        WHERE Username = '$currentUsername' LIMIT 1) ORDER BY t_address.id_Address DESC LIMIT 1";

        // Exécution de la requête + stockage du retour
        $getShipAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour des informations de la dernière adresse de livraison
        return $getShipAddr;
      }
    }

    // Récupération de la dernière adresse de facturation d'un utilisateur avec son nom d'utilisateur
    public function getLastBillingAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $currentUsername = $_GET['username'];

        // Requête
        $sql = "SELECT id_Address, t_address.Address as 'billingAddress',FK_Title,t_address.FullName, t_address.City AS 'billingCity', t_address.Zip AS 'billingZip' , t_address.FK_AddressType, t_address.FK_Customer
        FROM t_address
        WHERE FK_AddressType = 2 AND FK_Customer = (SELECT id_customer FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        WHERE Username = '$currentUsername' LIMIT 1) ORDER BY t_address.id_Address DESC LIMIT 1";

        // Exécution de la requête + stockage du retour
        $getShipAddr=($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour des informations de la dernière adresse de facturation
        return $getShipAddr;
      }
    }

    // Récupération de toutes les adresses de livraison d'un utilisateur avec son nom d'utilisateur
    public function getAllShippingsAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Tableau
        $shippingAddress = [];
        // Assignation des valeurs
        $currentUsername = $_GET['username'];
        // Requête
        $sql = "SELECT FK_AddressType as addressType, isDefault ,t_address.id_Address as 'shippingID',FK_Title, t_address.FullName, t_address.Address as 'shippingAddress',t_address.City AS 'shippingCity', t_address.Zip AS 'shippingZip' , t_address.FK_AddressType, t_address.FK_Customer
        FROM t_address
        WHERE FK_AddressType = 1 AND FK_Customer = (SELECT id_customer FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        WHERE Username = '$currentUsername' LIMIT 1) AND isActive = 1
        ORDER BY `isDefault` DESC";

        // Exécution de la requête + stockage du retour
        $getShipAddr=($this->Query($sql));

        // Vérifier que l'on reçoit au moins une ligne en retour
        if($getShipAddr->rowCount() > 0) {

            // Sortir les données pour chaque "row"
            $cr = 0;
            while($row = $getShipAddr->fetch( PDO::FETCH_ASSOC )) {
              $shippingAddress[$cr]['addressType'] = $row['addressType'];
              $shippingAddress[$cr]['isDefault'] = $row['isDefault'];
              $shippingAddress[$cr]['FK_Title'] = $row['FK_Title'];
              $shippingAddress[$cr]['FullName'] = $row['FullName'];
              $shippingAddress[$cr]['shippingID'] = $row['shippingID'];
              $shippingAddress[$cr]['shippingAddress'] = $row['shippingAddress'];
              $shippingAddress[$cr]['shippingCity'] = $row['shippingCity'];
              $shippingAddress[$cr]['shippingZip'] = $row['shippingZip'];

              $cr++;
            }
            // echo de la liste des adresses
            return $shippingAddress;
          }
          return $getShipAddr;
        }
    }

    // Récupération de toutes les adresses de facturation d'un utilisateur avec son nom d'utilisateur
    public function getAllBillingsAddressByUser(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Tableau
        $billingAddress = [];
        // Assignation des valeurs
        $currentUsername = $_GET['username'];
        // Requête
        $sql = "SELECT FK_AddressType as addressType,isDefault, t_address.id_Address as 'billingID',FK_Title, t_address.FullName, Address as 'billingAddress',City AS 'billingCity', Zip AS 'billingZip' , FK_AddressType, FK_Customer
        FROM t_address
        WHERE FK_AddressType = 2 AND FK_Customer = (SELECT id_customer FROM t_users
        INNER JOIN t_customers ON t_users.fk_customer = t_customers.id_customer
        WHERE Username = '$currentUsername'  LIMIT 1)AND isActive = 1
        ORDER BY `isDefault` DESC";

        // Exécution de la requête + stockage du retour
        $getBillAddr=($this->Query($sql));

        // Vérifier que l'on reçoit au moins une ligne en retour
        if($getBillAddr->rowCount() > 0) {

          // Sortir les données pour chaque "row"
          $cr = 0;
          while($row = $getBillAddr->fetch( PDO::FETCH_ASSOC )) {
            $billingAddress[$cr]['addressType'] = $row['addressType'];
            $billingAddress[$cr]['isDefault'] = $row['isDefault'];
            $billingAddress[$cr]['FK_Title'] = $row['FK_Title'];
            $billingAddress[$cr]['FullName'] = $row['FullName'];
            $billingAddress[$cr]['billingID'] = $row['billingID'];
            $billingAddress[$cr]['billingAddress'] = $row['billingAddress'];
            $billingAddress[$cr]['billingCity'] = $row['billingCity'];
            $billingAddress[$cr]['billingZip'] = $row['billingZip'];

            $cr++;
          }
          // echo de la liste des adresses
          return $billingAddress;
        }
        return $getBillAddr;
      }
    }

    // Désactiver une adresse avec l'id de l'adresse
    public function disableAddress(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['addressID'])){
        // Assignation des valeurs
        $id =$_GET['addressID'];

        // Requête
        $sql = "UPDATE
        t_address
        SET
        t_address.isActive = '0'
        WHERE t_address.id_Address = '$id'";

        // Exécution de la requête
        $this->Query($sql);
      }
    }

    // Ajout d'une adresse
    public function AddAddress(){
      // Vérifier que l'on reçoit bien les données voulues
      if($this->jsonToProcess !=null)
      {
        // Vérifier que l'on reçoit bien le paramètre voulu
        if(isset($_GET['username'])){
          // Assignation des valeurs
          $username = $_GET['username'];
          // Récupération des données reçues
          $titre = $this->jsonToProcess->CustomerTitle;
          $fullName = $this->jsonToProcess->FullName;
          $type = $this->jsonToProcess->addressType;
          $address = $this->jsonToProcess->address;
          $city = $this->jsonToProcess->city;
          $zip = $this->jsonToProcess->zip;

          // Si le type est "3" cela veut dire qu'on doit créer une adresse de livraison et une adresse de facturation avec les mêmes données
          if($type==3){
            // Requête
            $addShipAddress1 = "INSERT INTO t_address
            (Address ,FullName, City , Zip , FK_AddressType , FK_Customer,FK_Title)
            VALUES ('$address','$fullName','$city','$zip','1',
            (SELECT id_customer FROM t_customers INNER JOIN t_users ON t_users.FK_Customer = t_customers.id_customer
            WHERE t_users.Username = '$username'),'$titre')";

            // Requête
            $addBillAddress1 = "INSERT INTO t_address
            (Address ,FullName, City , Zip , FK_AddressType , FK_Customer,FK_Title)
            VALUES ('$address','$fullName','$city','$zip','2',
            (SELECT id_customer FROM t_customers INNER JOIN t_users ON t_users.FK_Customer = t_customers.id_customer
            WHERE t_users.Username = '$username'),'$titre')";

            // Exécution des requêtes
            $this->Query($addShipAddress1);
            $this->Query($addBillAddress1);
          }else{
              //Insertion d'une adresse - requête
              $addAddress = "INSERT INTO t_address
              (Address ,FullName, City , Zip , FK_AddressType , FK_Customer,FK_Title)
              VALUES ('$address','$fullName','$city','$zip','$type',
              (SELECT id_customer FROM t_customers INNER JOIN t_users ON t_users.FK_Customer = t_customers.id_customer
              WHERE t_users.Username = '$username'),'$titre')";

              // Exécution de la requête
              $this->Query($addAddress);
          }
        }
      }
    }

    // Définir une adresse par défaut
    public function SetAddressByDefault(){
      // Vérifier que l'on reçoit bien les paramètres voulus
      if(isset($_GET['addressID'])){
        // Assignation des valeurs
        $id =$_GET['addressID'];
        $type =$_GET['addressType'];
        $currentUsername =$_GET['username'];

        // Requête
        $sql1 = "UPDATE
        t_address
        SET
        T_address.isDefault ='0'
        WHERE t_address.isDefault = '1' AND t_address.FK_AddressType = '$type'
        AND FK_Customer = (SELECT id_customer FROM t_customers
        INNER JOIN t_users on t_users.FK_Customer = t_customers.id_customer
        WHERE t_users.Username ='$currentUsername')";

        // Exécution de la requête
        $this->Query($sql1);

        // Requête
        $sql2 = "UPDATE
        t_address
        SET
        T_address.isDefault ='1'
        WHERE t_address.id_Address = '$id'";

        // Exécution de la requête
        $this->Query($sql2);
      }
    }

    // Function pour vérifier si qqn utilise un formulaire de modification d'un client
    public function LockCheck(){
      // Requête
      $sql = " SELECT LockedBy FROM t_lock_customer
      WHERE FK_Customer = $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    //  Mettre à jour le le temps de lock au temps actuel
    public function UpdateLock(){
      // Requête
      $sql = "UPDATE  	t_lock_customer
      SET
      t_lock_customer.LockTime = NOW()
      WHERE
      t_lock_customer.FK_Customer = $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;
    }

    // Ajout d'un lock pour l'édition d'un formulaire
    public function AddLock(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $username= $_GET['username'];
        // Requête
        $sql = "INSERT INTO t_lock_customer (LockedBy, FK_Customer)
        VALUES ('$username', $this->idToProcess)";

        // Exécution de la requête + stockage du retour
        $tmpResult = ($this->Query($sql));

        // Retour du résultat
        return $tmpResult;
      }

    }

    // Libérer le vérouillage de l'édition du formulaire avec le nom d'utilisateur
    public function ReleaseLock(){
      // Vérifier que l'on reçoit bien le paramètre voulu
      if(isset($_GET['username'])){
        // Assignation des valeurs
        $username= $_GET['username'];
        // Requête
        $sql = "DELETE FROM t_lock_customer WHERE FK_Customer= $this->idToProcess AND LockedBy= '$username'";

        // Exécution de la requête + stockage du retour
        $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

        // Retour du résultat
        return $tmpResult;
      }

    }

    // Forcer la suppression du vérouillage du formulaire
    public function ForceReleaseLock(){
      // Requête
      $sql = "DELETE FROM t_lock_customer WHERE FK_Customer= $this->idToProcess";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql)->fetch( PDO::FETCH_ASSOC));

      // Retour du résultat
      return $tmpResult;

    }

    // Nettoyer la table de vérouillage
    public function CleanupLocks(){
      //  Requête
      $sql = "DELETE FROM t_lock_customer WHERE TIME_TO_SEC(LockTime)+600 <= TIME_TO_SEC(NOW())";

      // Exécution de la requête + stockage du retour
      $tmpResult = ($this->Query($sql));

      // Retour du résultat
      return $tmpResult;
    }

  }

 ?>
