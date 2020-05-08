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
      //Update
      $sql = "UPDATE t_rss SET t_rss.Title ='$rssTitle', t_rss.Description = '$rssDescription' WHERE t_rss.Link = $rssLink";
      $this->Query($sql);
    }

    // Lors de la création d'un nouvel article
    public function AddRss($rssTitle, $rssLink, $rssGuid, $rssDescription)
    {
        $sql = "INSERT INTO t_rss (Title, Link, Guid, Description)
                VALUES ('$rssTitle','$rssLink','$rssGuid','$rssDescription')";
        $this->Query($sql);
    }

    // Récupérer les données du rss
    public function GetRSS($limitation){
        $sql = "SELECT * FROM t_rss ORDER BY PubDate DESC LIMIT $limitation";
		    $resultat = $this->Query($sql);
		    return $resultat->fetchAll();
    }
}

?>
