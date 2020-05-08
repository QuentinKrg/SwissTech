<?php

function update_fluxRSS($rssEntity) {
  /*  Nous allons générer notre fichier XML d'un seul coup. Pour cela, nous allons stocker tout notre
     fichier dans une variable php : $xml.
     On commence par déclarer le fichier XML puis la version du flux RSS 2.0.
     Puis, on ajoute les éléments d'information sur le channel. Notez que nous avons volontairement
     omit quelques balises :
     */

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<rss version="2.0">';
    $xml .= '<channel>';
    $xml .= ' <title>News Article</title>';
    $xml .= ' <link>http://swisstech.shop</link>';
    $xml .= ' <description>Voici les news qui vous previendront des nouveaux articles paru sur notre site</description>';
    $xml .= ' <image>';
    $xml .= '   <title>Logo Site Web</title>';
    $xml .= '   <url>http://localhost:4200/src/assets/images/Swisstech-desktop-logo.png</url> ';
    $xml .= '   <link>http://swisstech.shop</link> ';
    $xml .= '   <description>Les meilleurs articles pour le meilleure prix</description>';
    $xml .= '   <width>80</width>';
    $xml .= '   <height>80</height>';
    $xml .= ' </image>';
    $xml .= ' <language>fr</language>';
    $xml .= ' <copyright>swisstech.shop</copyright>';
    $xml .= ' <managingEditor>rss@swisstech.shop</managingEditor>';
    $xml .= ' <category>OnlineShop</category>';
    $xml .= ' <generator>PHP/MySQL</generator>';
    $xml .= ' <docs>http://www.rssboard.org</docs>';



    /*  Maintenant, nous allons nous connecter à notre base de données afin d'aller chercher les
     items à insérer dans le flux RSS.
     */

    //on lit les 5 premiers éléments à partir du dernier ajouté dans la base de données
    $limitation = 5;
    $donnees =  $rssEntity->GetRSS($limitation);
    //Une fois les informations récupérées, on ajoute un à un les items à notre fichier
    foreach($donnees as $value)
    {
        $xml .= '<item>';
        $xml .= '<title>'.stripcslashes($value['Title']).'</title>';
        $xml .= '<link>location:index.php?controller=Article&amp;action=articlecommentaire&amp;id='.$value['Link'].'</link>';
        $xml .= '<guid isPermaLink="true">'.$value['Guid'].'</guid>';
        $xml .= '<pubDate>'.$value['PubDate'].'</pubDate>';
        $xml .= '<description>'.stripcslashes($value['Description']).'</description>';
        $xml .= '</item>';
    }

    //Et on ferme le channel et le flux RSS.
    $xml .= '</channel>';
    $xml .= '</rss>';
    /*  Tout notre fichier RSS est maintenant contenu dans la variable $xml.
     Nous allons maintenant l'écrire dans notre fichier XML et ainsi mettre à jour notre flux.
     Pour cela, nous allons utiliser les fonctions de php File pour écrire dans le fichier.

     Notez que l'adresse URL du fichier doit être relative obligatoirement !
     */
    //On ouvre le fichier en mode écriture
    $fp = fopen("Rss.xml", 'w+');

    //On écrit notre flux RSS
    fputs($fp, $xml);

    //Puis on referme le fichier
    fclose($fp);

} //Fermeture de la fonction

 ?>
