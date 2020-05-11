<?php

  // Class pour debug
  include('_Helpers/vardump.php');
  include('Entities/User.php');

  class Entity {

    // Attributs
    public $jsonToProcess = null;
    public $idToProcess = null;
    public $dbconnection = null;
    public $isUserTokenValid = false;

    // Attributs pour la connexion à la bdd
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "db_swisstech";

    // Variable de la DB
    private $dbSt = null;

    // Appel de la fonction connect
    public function init() {

      // Récupération de toutes les données après les Headers
      $json =  file_get_contents("php://input");
      // Vérifier si qqch a été reçu
      if ($json != false)
      {
          // Stocker les valeurs reçues
          $this->jsonToProcess = json_decode($json);
      }

      // Vérification de l'ID reçu en paramètre
      if (isset($_GET["id"]) != "" && is_numeric($_GET["id"]))
      {
          $this->idToProcess = $_GET["id"];
      }

      // Connexion à la DB
      $this->Connect();
    }

    // Connexion à la DB
    public function Connect() {
      $this->dbSt = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password,
                            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
    }

    // Executer les requêtes
    public function Query($query) {
      $stmt = $this->dbSt->prepare($query);
      $stmt->execute();

      return $stmt;
    }

    // Vérification du Token
    public function CheckToken($checkRole = false) {
      // Variable de méthode pour CheckToken()
      $hdUsername = "";
      $hdToken = "";
      $hdRoleCode = "";
      $hdIpAddr = "";

      // Récupération du token dans les en-têtes HTML
      foreach (getallheaders() as $name => $value) {
          if($name == "Username")
          {
            $hdUsername = $value;
          }
          if($name == "Authorization")
          {
            $hdToken = $value;
          }
          if($name == "Role")
          {
            $hdRoleCode = $value;
          }
          if($name == "LastIpAddr")
          {
            $hdIpAddr = $value;
          }
      }

      // Checker que le token ne soit pas vide
      if($hdUsername == "" || $hdToken == "")
      {
        return false;
      }

      $userEntity = new User();
      // Récupération des données de l'utilsateur
      $userInDB = $userEntity->GetUserByUsername($hdUsername);

      // Vérifier que l'on récupère qqch
      if($userInDB == null)
      {
        return false;
      }

      // Le role doit-il être vérifier
      if($checkRole)
      {
        if($hdRoleCode != "AD")
        {
          return false;
        }
      }

      // Vérifier que l'adresse IP est la même qu'à la dernière connexion. Sinon => logout
      if($hdIpAddr != "")
      {
        // Si l'adresse IP est la même => true
        if ($hdIpAddr == $userInDB['IpAddress']) {
          return true;
        } else {
          // sinon false
          return false;
        }
      }

      // Vérification de la validité du token de l'utilisateur
      $actualDateTime = new DateTime();
      // Si valide
      if($userInDB['Token'] != null && $userInDB['TokenValidity'] != null)
      {
        $userTokenDateTime = new DateTime($userInDB['TokenValidity']);
        if($userTokenDateTime >= $actualDateTime)
        {
          $userEntity->UpdateTokenValidity($hdUsername);
          return true;
        } else {
          return false;
        }
      }
    }


    // Récupération du token par l'id de l'utilsateur
    public function getTokenByUserId($userid, $token) {

      $sql = "SELECT token, tokenValidity FROM user WHERE id = '$userid'";

      $resultat = $this->Query($sql);

      return $resultat;
    }

    public function Error($message)
    {
      echo $message;
    }

  }
?>
