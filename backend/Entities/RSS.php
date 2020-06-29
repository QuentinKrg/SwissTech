<?php
/*
  Classe pour la gestion des articles RSS, elle hérite de la classe "Entity"
*/

class RSS extends Entity
{
    // Construction
    public function  __construct()
    {
      // Connexion à la bdd
      $this->Connect();
    }

    // Lors de la mise à jour d'un article => metttre à jour l'article RSS
    public function UpdateRss($rssTitle, $rssLink, $rssDescription)
    {
      // Vérifier s'il existe avant de mettre à jour
      $checkIfExist = "SELECT * FROM t_rss WHERE t_rss.Link = $rssLink";
      // Exécution de la requête + stockage du retour
      $tmpResult = $this->Query($checkIfExist);
      // Vérifier que l'on reçoit au moins une ligne de données, si c'est le cas => mise à jour de la ligne en question
      if($tmpResult->fetch( PDO::FETCH_ASSOC ) > 0) {
        // REquête d'update
        $sql = "UPDATE t_rss SET t_rss.Title ='$rssTitle', t_rss.Description = '$rssDescription' WHERE t_rss.Link = $rssLink";
        // Exécution de la requête
        $this->Query($sql);
      } else {
        // Sinon ajout d'un nouvel élément
        $this->AddRss($rssTitle, $rssLink, time(), $rssDescription);
      }

    }

    // Lors de la création d'un nouvel article
    public function AddRss($rssTitle, $rssLink, $rssGuid, $rssDescription)
    {
      // Requête d'insertion d'un nouvel élément RSS
      $sql = "INSERT INTO t_rss (Title, Link, Guid, Description)
              VALUES ('$rssTitle','$rssLink','$rssGuid','$rssDescription')";
      // Exécution de la requête
      $this->Query($sql);
    }

    // Récupérer les données du rss avec une limite
    public function GetRSS($limitation){
      // Requête pour la récupération des données présentes dans la talbe "t_rss" par ordre de publication la plus récente
      $sql = "SELECT * FROM t_rss ORDER BY PubDate DESC LIMIT $limitation";
      // Exécution de la requête + stockage du retour
	    $resultat = $this->Query($sql);

      // Retour du résultat
	    return $resultat->fetchAll();
    }

    // Retourne le fichier XML pour s'abonner au flux RSS
    public function GetFeed() {
      header("Content-type: text/xml");
      // Chemin vers le ficheir .xml
      $url = "./Rss.xml";
      // Stockage des éléments présents dans le fichier xml
      $xml = new SimpleXMLElement($url, NULL, TRUE);
      // Retour des données
      return $xml->asXML();
    }
}

?>
