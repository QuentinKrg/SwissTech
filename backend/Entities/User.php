<?php

class User extends Entity
{

  public function __construct()
  {
    $this->Connect();
  }
  public function Login() {

	 
    // Vérifier que l'on a bien reçu des données
    if($this->jsonToProcess !=null)
    {
      // Récupération et attribution des données reçues
      $login = $this->jsonToProcess->username;
      $password = $this->jsonToProcess->password;

	 
      // Récupération des données de l'utilsateur
      $userInDB = $this->GetUserByUsername($login);

      // Vérifier que l'on récupère qqch
      if($userInDB == null)
      {
        return http_response_code(408);
      }

      // Hash du mot de passe reçu et du salt de l'utilisateur
      $hashedPassword = hash('sha256', $userInDB['Salt'].$password);

      // Vérifier que le mot de passe hashé et celui en base correspondent
      if($hashedPassword != $userInDB['Password'])
      {
        return http_response_code(409);
      }

      // Vérifier que l'utilisateur est bien actif
      if($userInDB['isActive'] == 0 || $userInDB['isActive'] == null)
      {
        return http_response_code(410);
      }

      // Vérification de la validité du token de l'utilisateur
      $actualDateTime = new DateTime();
      // Si valide
      if($userInDB['Token'] != null && $userInDB['TokenValidity'] != null)
      {
        $userTokenDateTime = new DateTime($userInDB['TokenValidity']);

        if($userTokenDateTime >= $actualDateTime)
        {
          $this->UpdateTokenValidity($login);
          // Envoie au format JSON du login, token, et role de l'utilisateur
          return ['id'=>$userInDB['id_user'],'login'=>$login,'token'=>$userInDB['Token'],'role'=>$userInDB['RoleCode'],'FK_Customer'=>$userInDB['FK_Customer']];
        }
      }

      // Si non valide: création d'un token
      $userToken = $this->CreateToken($login);

      // Vérifier si le token est null
      if($userToken == null)
      {
        return http_response_code(408);
      }
	  
	  $this->UpdateIpAddress($login);  
	
      // Envoie au format JSON du login, token, et role de l'utilisateur
      return ['id'=>$userInDB['id_user'],'login'=>$login,'token'=>$userToken,'role'=>$userInDB['RoleCode'],'FK_Customer'=>$userInDB['FK_Customer']];
    }
  }
  public function UpdateIpAddress($login){
		if (!empty($_SERVER['HTTP_CLIENT_IP']))   
		  {
			$ip_address = $_SERVER['HTTP_CLIENT_IP'];
		  }
		//whether ip is from proxy
		elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
		  {
			$ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
		  }
		//whether ip is from remote address
		else
		  {
			$ip_address = $_SERVER['REMOTE_ADDR'];
		  }
	  
		$sql ="UPDATE t_users SET IpAddress ='$ip_address' WHERE  Username ='$login'";
		$this->Query($sql);
  }


  // Récupération d'un utilsateur avec son username
  public function GetUserByUsername($username)
  {
    $sql = "SELECT * FROM t_users INNER JOIN t_roles ON t_users.FK_Role = t_roles.id_role WHERE Username = '$username'";
    $tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
    return $tmpUser;
  }

  // Mise à jour du temps de validiter du token
  public function UpdateTokenValidity($login)
  {
    $dateTimeValidity = new DateTime();
    $dateTimeValidity->Add(new DateInterval('PT1M'));
    $tokenValidity = $dateTimeValidity->format('yy-m-d H:i:s');

    $sql = "UPDATE t_users SET TokenValidity = '$tokenValidity' WHERE Username = '$login'";

    $this->Query($sql);
  }

  // Création d'un token
  private function CreateToken($login)
  {

    // Création du token
    $token = md5(bin2hex(random_bytes(10)));

    // Génération de la validité du token
    $validity = new DateTime();
    $validity->Add(new DateInterval('PT1M'));
    $tokenValidity = $validity->format('yy-m-d H:i:s');

    // Requête SQL
    $sql = "UPDATE t_users SET Token = '$token', TokenValidity = '$tokenValidity' WHERE Username = '$login'";

    // Execution de la requête
    $this->Query($sql);
    return $token;
  }

  public function GetAllUsers() {

    // Variable
    $allUser = [];
    // Requête
    $sql="SELECT * FROM t_users INNER JOIN t_roles ON t_users.FK_Role = t_roles.id_role INNER JOIN t_customers ON t_customers.id_customer = t_users.FK_Customer";
    // Execution
    $tmpResult = $this->Query($sql);

    // Stockage + retour
    if($tmpResult->rowCount() > 0) {
      // Sortir les données pour chaque "row"
      $cr = 0;
      while($row = $tmpResult->fetch( PDO::FETCH_ASSOC )) {
        $allUser[$cr]['id'] = $row['id_user'];
        $allUser[$cr]['login'] = $row['Username'];
        $allUser[$cr]['username'] = $row['CustomerName']." ".$row['CustomerLastName'];
        $allUser[$cr]['role'] = $row['RoleCode'];
        $allUser[$cr]['isActive'] = $row['isActive'];
        $cr++;
      }

      return $allUser;
    }


  }

  // Mise à jour du role d'un utilisateur
  public function UpdateUserRole() {
    if($this->jsonToProcess !=null)
    {
      $userID = $this->jsonToProcess->id;
      $userRoleCode = $this->jsonToProcess->role;
      $FK_Role = -1;

      // Définir l'id du role de l'utilisateur
      switch ($userRoleCode) {
        case 'AD':
          $FK_Role = 2;
          break;
        case 'ST':
          $FK_Role = 1;
          break;
      }

      // Requête
      $sql="UPDATE t_users SET t_users.FK_Role = '$FK_Role' WHERE t_users.id_user = '$userID'";
      $this->Query($sql);
    }
  }

  // Mise à jour du statut d'un utilisateur
  public function UpdateUserStatus(){
    if($this->jsonToProcess !=null)
    {
      $userID = $this->jsonToProcess->id_user;
  	  $userStatus = $this->jsonToProcess->isActive;

  			//Update
  			$updateUserStatus = "UPDATE
  									t_users
  								SET
  									t_users.isActive = '$userStatus'
  								WHERE
  									t_users.id_user = '$userID'";
  			$this->Query($updateUserStatus);
    }
	}
}



 ?>
