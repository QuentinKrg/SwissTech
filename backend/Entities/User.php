<?php

class User extends Entity
{
  // Construction
  public function __construct()
  {
    // Connexion à la bdd
    $this->Connect();
  }

  // Authentification d'un user
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
        // Stockage de la date de validité du token de l'utilisateur
        $userTokenDateTime = new DateTime($userInDB['TokenValidity']);

        // Si la date de validité du token est plus grande que la date actuelle
        if($userTokenDateTime >= $actualDateTime)
        {
          // Mise à jour du token de l'utilisateur
          $this->UpdateTokenValidity($login);
          // Envoie au format JSON du login, token, et role de l'utilisateur
          return ['id'=>$userInDB['id_user'],'login'=>$login,'token'=>$userInDB['Token'],'role'=>$userInDB['RoleCode'],'FK_Customer'=>$userInDB['FK_Customer'],'IP_ADDR'=>$userInDB['IpAddress']];
        }
      }

      // Si non valide: création d'un token
      $userToken = $this->CreateToken($login);

      // Vérifier si le token est null
      if($userToken == null)
      {
        return http_response_code(408);
      }

      // Mise à jour de l'adresse IP
	    $newIpAddr = $this->UpdateIpAddress($login);

      // Envoie au format JSON du login, token, et role de l'utilisateur
      return ['id'=>$userInDB['id_user'],'login'=>$login,'token'=>$userToken,'role'=>$userInDB['RoleCode'],'FK_Customer'=>$userInDB['FK_Customer'],'IP_ADDR'=>$newIpAddr];
    }
  }

  // Fonction pour mettre à jour l'adresse IP d'un client en bdd
  public function UpdateIpAddress($login){
    // Adresse IP du client
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
      $ip_address = $_SERVER['HTTP_CLIENT_IP'];
    }
    //Si l'ip vient d'un server PROXY
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
      $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    // Si l'ip vient d'une remote address
    else
    {
      $ip_address = $_SERVER['REMOTE_ADDR'];
    }

    // Requête pour mettre à jour l'adresse IP du client
		$sql ="UPDATE t_users SET IpAddress ='$ip_address' WHERE  Username ='$login'";
    // Exécution de la requête
		$this->Query($sql);
    // Retour de l'adresse IP
    return $ip_address;
  }


  // Récupération d'un utilsateur avec son username
  public function GetUserByUsername($username)
  {
    // Requête
    $sql = "SELECT * FROM t_users INNER JOIN t_roles ON t_users.FK_Role = t_roles.id_role WHERE Username = '$username'";
    // Exécution de la requête + stockage du retour
    $tmpUser = $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
    // Retour du résultat
    return $tmpUser;
  }

  // Mise à jour du temps de validiter du token
  public function UpdateTokenValidity($login)
  {
    // Récupération du datetime actuel
    $dateTimeValidity = new DateTime();

    // Ajout d'un interval à la data de validité
    $dateTimeValidity->Add(new DateInterval('PT1M'));

    // Assignation de la nouvelle valeur
    $tokenValidity = $dateTimeValidity->format('yy-m-d H:i:s');

    // Requête pour mettre à jour la validité du token
    $sql = "UPDATE t_users SET TokenValidity = '$tokenValidity' WHERE Username = '$login'";

    // Exécution de la requête
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

  // Récupération de tous les utilisateurs
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
      // Retourr des données
      return $allUser;
    }
  }

  // Mise à jour du role d'un utilisateur
  public function UpdateUserRole() {
    // Vérifier que l'on reçoit bien les données voulues
    if($this->jsonToProcess !=null)
    {
      // Assignation des valeurs
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
      // Exécution de la requête
      $this->Query($sql);
    }
  }

  // Mise à jour du statut d'un utilisateur
  public function UpdateUserStatus(){
    // Vérifier que l'on reçoit bien les données voulues
    if($this->jsonToProcess !=null)
    {
      // Assignation des valeurs
      $userID = $this->jsonToProcess->id_user;
      $userStatus = $this->jsonToProcess->isActive;

      //Update
      $updateUserStatus = "UPDATE
      t_users
      SET
      t_users.isActive = '$userStatus'
      WHERE
      t_users.id_user = '$userID'";
      // Exécution de la requête 
      $this->Query($updateUserStatus);
    }
  }
}



 ?>
