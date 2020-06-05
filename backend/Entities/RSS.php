<?php
/**
 * User: Quentin Krenger
 * Date: 21.01.2020
 * Time: 12:44
 */

class RSS extends Entity
{

    public function  __construct()
    {
        $this->Connect();
    }

    // Lors de la mise à jour d'un article
    public function UpdateRss($rssTitle, $rssLink, $rssDescription)
    {
      // Vérifier s'il existe avant de mettre à jour
      $checkIfExist = "SELECT * FROM t_rss WHERE t_rss.Link = $rssLink";
      $tmpResult = $this->Query($checkIfExist);
      if($tmpResult->fetch( PDO::FETCH_ASSOC ) > 0) {
        //Update
        $sql = "UPDATE t_rss SET t_rss.Title ='$rssTitle', t_rss.Description = '$rssDescription' WHERE t_rss.Link = $rssLink";
        $this->Query($sql);
      } else {
        $this->AddRss($rssTitle, $rssLink, time(), $rssDescription);
      }

    }

    // Lors de la création d'un nouvel article
    public function AddRss($rssTitle, $rssLink, $rssGuid, $rssDescription)
    {
        $sql = "INSERT INTO t_rss (Title, Link, Guid, Description)
                VALUES ('$rssTitle','$rssLink','$rssGuid','$rssDescription')";
        $this->Query($sql);
    }

    // Récupérer les données du rss avec une limite
    public function GetRSS($limitation){
        $sql = "SELECT * FROM t_rss ORDER BY PubDate DESC LIMIT $limitation";
		    $resultat = $this->Query($sql);
		    return $resultat->fetchAll();
    }

    // Retourne le fichier XML pour s'abonner au flux RSS
    public function GetFeed() {
      $url = "./Rss.xml";
      $xml = new SimpleXMLElement($url, NULL, TRUE);
      return $xml->asXML();
    }



}

?>
