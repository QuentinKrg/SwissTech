<?php

class User extends Entity
{

  public function Login() {

    // Vérifier que l'on a bien reçu des données
    //if(true)
    if($this->jsonToProcess !=null)
    {
      $login = $this->jsonToProcess->username;
      //$login = "test";
      $password = $this->jsonToProcess->password;
      //$password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";


      $userInDB = $this->GetUserByUsername($login);
      //vardump(array($login,$password));
      if($userInDB == null)
      {
        return http_response_code(406);
      }

      $hashedPassword = hash('sha256', $userInDB['salt'].$password);

      if($hashedPassword != $userInDB['password'])
      {
        return http_response_code(401);
      }

      // Check if usertokenvalidity is always good or note
      // Si valide
      $actualDateTime = new DateTime();

      if($userInDB['token'] != null && $userInDB['tokenValidity'] != null)
      {
        $userTokenDateTime = new DateTime($userInDB['tokenValidity']);

        if($userTokenDateTime >= $actualDateTime)
        {
          $this->UpdateTokenValidity($login);
          //vardump(array($userInDB['token'],$userTokenDateTime));
          return $userInDB['token'];
        }
      }

      // Si non valide: créer un token
      $userToken = $this->CreateToken($login);

      // Vérifier si le token est null
      if($userToken == null)
      {
        return http_response_code(407);
      }
      // Envoie au format JSON du token
      //vardump($userToken);
      return ['Token'=>$userToken,'UserLogin'=>$login];
  }
}

  
  private function GetUserByUsername($username)
  {
    $sql = "SELECT * FROM user WHERE login = '$username' LIMIT 1";

    return $this->Query($sql)->fetch(PDO::FETCH_ASSOC);
  }

  // Mise à jour du temps de validiter du token
  public function UpdateTokenValidity($login)
  {
    $dateTimeValidity = new DateTime();
    $dateTimeValidity->Add(new DateInterval('PT1M'));
    $tokenValidity = $dateTimeValidity->format('yy-m-d H:i:s');

    $sql = "UPDATE user SET tokenValidity = '$tokenValidity' WHERE login = '$login'";
    //vardump($sql);
    $this->Query($sql);
  }

  private function CreateToken($login)
  {
    // Création du token
    $token = md5(bin2hex(random_bytes(10)));

    // Génération de la validité du token
    $validity = new DateTime();
    $validity->Add(new DateInterval('PT1M'));
    $tokenValidity = $validity->format('yy-m-d H:i:s');

    // Requête SQL
    $sql = "UPDATE user SET token = '$token', tokenValidity = '$tokenValidity' WHERE login = '$login'";

    // Execution de la requête
    $this->Query($sql);
    return $token;
  }
}


 ?>
