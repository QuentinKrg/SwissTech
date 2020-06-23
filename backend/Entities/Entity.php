<?php
/*
  Classe pour la gestion des requêtes à la bbd + Vérification du token
*/
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
    private $servername = "0o02i.myd.infomaniak.com";
    private $username = "0o02i_st_a";
    private $password = "pSO7n-rjcsV6";
    private $dbname = "0o02i_db_swisstech";

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
      // Préparer la requête
      $stmt = $this->dbSt->prepare($query);
      // Exécution de la requête
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
        // Vérifier que le rôle dans l'en-tête soit 'AD'
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
        // Récupération du temps de validité du token
        $userTokenDateTime = new DateTime($userInDB['TokenValidity']);
        // Si la date / temps de validité du token de l'utilisateur est plus grand que le datetime actuel => mise à jour du token : valide !
        if($userTokenDateTime >= $actualDateTime)
        {
          // Mise à jour du token de l'utilisateur grâce à son nom d'utilisateur
          $userEntity->UpdateTokenValidity($hdUsername);
          return true;
        } else {
          return false;
        }
      }
    }


    // Récupération du token par l'id de l'utilsateur
    public function getTokenByUserId($userid, $token) {
      // Requête
      $sql = "SELECT token, tokenValidity FROM user WHERE id = '$userid'";
      // Exécution de la requête + stockage du retour
      $resultat = $this->Query($sql);

      // Retour du résultat
      return $resultat;
    }

    public function Error($message)
    {
      echo $message;
    }

  }
?>
