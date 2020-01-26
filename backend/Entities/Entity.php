<?php

  // Class pour debug
  include('_Helpers/vardump.php');

  class html_entity_decode {

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

      $this->CheckToken();

      $json =  file_get_contents("php://input");
        if ($json != false)
        {
            $this->jsonToProcess = json_decode($json);
        }

        if (isset($_GET["id"]) != "" && is_numeric($_GET["id"]))
        {
            $this->idToProcess = $_GET["id"];
        }

        $this->Connection();
    }

    // Connexion à la DB
    public function Connect() {
      $this->dbSt = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password,
                            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
      // Set the PDO error mode to exception
      $this->dbSt->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXEPTION);
    }

    // Executer les requêtes
    public function Query($query) {
      $stmt = $this->dbSt->prepare($query);
      $stmt->execute();

        return $stmt;
    }

    // Vérification du Token
    public function CheckToken() {


      return $this->isUserTokenValid = true;
    }
  }
?>
