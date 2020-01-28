<?php

  // Class pour debug
  include('_Helpers/vardump.php');

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
    private $dbname = "angular8php";

    // Variable de la DB
    private $dbSt = null;

    // Appel de la fonction connect
    public function init() {

      // Vérification du token
      $this->CheckToken();

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
    public function CheckToken() {

      // Récupération du token dans les en-têtes HTML

      // Checker si le token voulue existe et n'est pas vide

      // Assigner les valeurs voulues

      // Vérifier la valeur du token grâce à l'id du User

      // Mettre à jour le temps de validiter du token

      return $this->isUserTokenValid = true;
    }

    // Récupération du token par l'id de l'utilsateur
    public function getTokenByUserId($userid, $token) {

      $sql = "SELECT token, tokenValidity FROM user WHERE id = '$userid'";

      $resultat = $this->Query($sql);

      return $resultat;
    }


  }
?>
